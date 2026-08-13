/**
 * One-time migration: reads the old MySQL dump (nexuspc.sql) and inserts
 * everything into the MongoDB `products` collection using the existing
 * Product model — so the product page starts showing real data.
 *
 * Usage (from backend/ folder):
 *   node scripts/migrateFromSQL.js
 *   node scripts/migrateFromSQL.js ./path/to/nexuspc.sql
 *
 * Safe to re-run: it wipes the products collection first, so you never
 * end up with duplicates.
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { parseDump } = require('./sqlDumpParser');
const Product = require('../models/Product');

const SQL_PATH = process.argv[2] || path.join(__dirname, '..', 'nexuspc.sql');

// Every legacy table below already matches an enum value on the Product
// model 1:1 (category === table name), which keeps this mapping trivial.
const CATEGORY_TABLES = [
  'cpu', 'gpu', 'ram', 'mobo', 'hdd', 'ssd', 'psu', 'casing', 'cooler',
  'adapters', 'airbuds', 'airpods', 'cables', 'cases', 'cooling_fans',
  'custom_cases', 'gaming_sets', 'handsfree', 'headsets', 'power_banks',
  'tripods', 'smart_watches', 'watch_straps',
];

// The old generic `products` table has a free-text Category column
// instead of its own table, so it needs a small text -> enum lookup.
const GENERIC_CATEGORY_MAP = {
  processor: 'cpu',
  cpu: 'cpu',
  ram: 'ram',
  memory: 'ram',
  gpu: 'gpu',
  'graphics card': 'gpu',
};

function cleanPrice(raw) {
  if (raw === null || raw === undefined) return 0;
  const digits = String(raw).replace(/[^0-9.]/g, '');
  return digits ? parseFloat(digits) : 0;
}

function cleanSpecs(obj) {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') out[k] = v;
  });
  return out;
}

function mapCategoryRow(table, row) {
  return {
    name: row.Name,
    price: cleanPrice(row.Price),
    image: row.IMAGE || row.Image || 'default.png',
    category: table,
    description: row.description || '',
    stock: row.quantity !== undefined && row.quantity !== null ? Number(row.quantity) : 10,
    specs: cleanSpecs({
      color: row.color,
      oldPrice: row.old_price ? cleanPrice(row.old_price) : undefined,
      socket: row.socket,
      productType: row.product_type,
      originalCategoryLabel: row.Category,
      stockStatus: row.stock_status,
    }),
    deleted_at: row.deleted_at ? new Date(row.deleted_at) : null,
    isFeatured: false,
  };
}

function mapGenericProductRow(row) {
  const label = (row.Category || '').trim().toLowerCase();
  return {
    name: row.Name,
    price: cleanPrice(row.Price),
    image: row.Image || row.IMAGE || 'default.png',
    category: GENERIC_CATEGORY_MAP[label] || 'other',
    description: row.description || '',
    stock: 10,
    specs: cleanSpecs({
      originalCategoryLabel: row.Category,
      stockStatus: row.stock_status,
      legacyProductId: row.ID,
      legacyCatProdId: row.cat_prod_id,
    }),
    deleted_at: null,
    isFeatured: false,
  };
}

// A few legacy IMAGE values got truncated because the old MySQL column was
// varchar(100) and some generated filenames were longer than that. If the
// exact filename isn't found in backend/uploads, fall back to a prefix
// match (the timestamp + start of the name is always intact and unique).
function reconcileImages(products) {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) return { products, fixed: 0, stillMissing: [] };

  const files = fs.readdirSync(uploadsDir).filter((f) =>
    fs.statSync(path.join(uploadsDir, f)).isFile()
  );
  const fileSet = new Set(files);

  let fixed = 0;
  const stillMissing = [];

  products.forEach((p) => {
    if (fileSet.has(p.image)) return;
    const match = files.find((f) => f.startsWith(p.image));
    if (match) {
      p.image = match;
      fixed += 1;
    } else {
      stillMissing.push(`${p.category} | ${p.name} | ${p.image}`);
    }
  });

  return { products, fixed, stillMissing };
}

async function run() {
  if (!fs.existsSync(SQL_PATH)) {
    console.error(`SQL dump not found at: ${SQL_PATH}`);
    console.error('Pass the path explicitly: node scripts/migrateFromSQL.js /path/to/nexuspc.sql');
    process.exit(1);
  }

  console.log(`Reading dump: ${SQL_PATH}`);
  const sql = fs.readFileSync(SQL_PATH, 'utf8');
  const tables = parseDump(sql);

  const productsToInsert = [];

  CATEGORY_TABLES.forEach((table) => {
    const rows = tables[table] || [];
    rows.forEach((row) => {
      if (!row.Name) return; // skip malformed rows
      productsToInsert.push(mapCategoryRow(table, row));
    });
    console.log(`  ${table.padEnd(14)} -> ${rows.length} rows`);
  });

  const genericRows = tables.products || [];
  genericRows.forEach((row) => {
    if (!row.Name) return;
    productsToInsert.push(mapGenericProductRow(row));
  });
  console.log(`  ${'products (generic)'.padEnd(14)} -> ${genericRows.length} rows`);

  console.log(`\nTotal products to migrate: ${productsToInsert.length}`);

  const { fixed, stillMissing } = reconcileImages(productsToInsert);
  if (fixed > 0) {
    console.log(`Reconciled ${fixed} truncated/mismatched image filename(s) against backend/uploads/.`);
  }
  if (stillMissing.length > 0) {
    console.log(`\nWarning: ${stillMissing.length} product(s) reference an image file that isn't in backend/uploads/:`);
    stillMissing.forEach((m) => console.log(`  - ${m}`));
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to MongoDB: ${process.env.MONGO_URI}`);

  const existing = await Product.countDocuments();
  console.log(`Clearing existing products collection (${existing} docs)...`);
  await Product.deleteMany({});

  const BATCH = 500;
  for (let i = 0; i < productsToInsert.length; i += BATCH) {
    const batch = productsToInsert.slice(i, i + BATCH);
    await Product.insertMany(batch, { ordered: false });
    console.log(`  inserted ${Math.min(i + BATCH, productsToInsert.length)}/${productsToInsert.length}`);
  }

  console.log('\nDone. Product counts by category:');
  const counts = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  counts.forEach((c) => console.log(`  ${c._id.padEnd(14)} ${c.count}`));

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});