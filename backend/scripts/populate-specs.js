/**
 * populate-specs.js
 * Auto-detects brand, socket, RAM type, VRAM, capacity, etc.
 * from product names and updates the MongoDB documents.
 *
 * Run: node scripts/populate-specs.js
 * Safe to run multiple times — skips already-populated fields.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('../models/Product');

// ── Detection Rules ──────────────────────────────────────────────────────────

const BRAND_RULES = [
  // CPU / GPU manufacturers
  { re: /\bintel\b/i,           brand: 'Intel' },
  { re: /\bamd\b/i,             brand: 'AMD' },
  { re: /\bcore\s*i[3579]\b/i,  brand: 'Intel' },
  { re: /\bryzen\b/i,           brand: 'AMD' },
  { re: /\bthreadripper\b/i,    brand: 'AMD' },
  { re: /\bxeon\b/i,            brand: 'Intel' },
  { re: /\bceleron\b/i,         brand: 'Intel' },
  { re: /\bpentium\b/i,         brand: 'Intel' },
  // GPU board partners
  { re: /\basus\b/i,            brand: 'ASUS' },
  { re: /\brog\b/i,             brand: 'ASUS' },
  { re: /\btuf\b/i,             brand: 'ASUS' },
  { re: /\bmsi\b/i,             brand: 'MSI' },
  { re: /\bgigabyte\b/i,        brand: 'Gigabyte' },
  { re: /\baorus\b/i,           brand: 'Gigabyte' },
  { re: /\bzotac\b/i,           brand: 'Zotac' },
  { re: /\bsapphire\b/i,        brand: 'Sapphire' },
  { re: /\bxfx\b/i,             brand: 'XFX' },
  { re: /\bpowercolor\b/i,      brand: 'PowerColor' },
  { re: /\basrock\b/i,          brand: 'ASRock' },
  // RAM / Storage
  { re: /\bcorsair\b/i,         brand: 'Corsair' },
  { re: /\bg\.?skill\b/i,       brand: 'G.Skill' },
  { re: /\bkingston\b/i,        brand: 'Kingston' },
  { re: /\bteam\s*group\b/i,    brand: 'TeamGroup' },
  { re: /\bteamgroup\b/i,       brand: 'TeamGroup' },
  { re: /\bteam\b/i,            brand: 'TeamGroup' },
  { re: /\bcrucial\b/i,         brand: 'Crucial' },
  { re: /\bhyperx\b/i,          brand: 'HyperX' },
  { re: /\bpatriots?\b/i,       brand: 'Patriot' },
  // Storage
  { re: /\bsamsung\b/i,         brand: 'Samsung' },
  { re: /\bwestern\s*digital\b/i, brand: 'WD' },
  { re: /\b\bwd\b/i,            brand: 'WD' },
  { re: /\bseagate\b/i,         brand: 'Seagate' },
  { re: /\btoshiba\b/i,         brand: 'Toshiba' },
  { re: /\bsandisk\b/i,         brand: 'SanDisk' },
  // PSU / Cooling
  { re: /\bevga\b/i,            brand: 'EVGA' },
  { re: /\bseasonic\b/i,        brand: 'Seasonic' },
  { re: /\bbe\s*quiet[!]?\b/i,  brand: 'be quiet!' },
  { re: /\bnoctua\b/i,          brand: 'Noctua' },
  { re: /\bdeepcool\b/i,        brand: 'DeepCool' },
  { re: /\bcooler\s*master\b/i, brand: 'Cooler Master' },
  { re: /\bcoolermaster\b/i,    brand: 'Cooler Master' },
  { re: /\bthermaltake\b/i,     brand: 'Thermaltake' },
  { re: /\bnzxt\b/i,            brand: 'NZXT' },
  { re: /\blian\s*li\b/i,       brand: 'Lian Li' },
  { re: /\bfractal\b/i,         brand: 'Fractal Design' },
  { re: /\bphanteks\b/i,        brand: 'Phanteks' },
  // Audio / Peripherals
  { re: /\bsony\b/i,            brand: 'Sony' },
  { re: /\bjbl\b/i,             brand: 'JBL' },
  { re: /\blogitech\b/i,        brand: 'Logitech' },
  { re: /\brazer\b/i,           brand: 'Razer' },
  { re: /\bsteelseries\b/i,     brand: 'SteelSeries' },
  { re: /\bsennheiser\b/i,      brand: 'Sennheiser' },
  // Smart Watches
  { re: /\bapple\b/i,           brand: 'Apple' },
  { re: /\bxiaomi\b/i,          brand: 'Xiaomi' },
  { re: /\bhuawei\b/i,          brand: 'Huawei' },
  { re: /\bfitbit\b/i,          brand: 'Fitbit' },
  { re: /\bgarmin\b/i,          brand: 'Garmin' },
  // Power Banks
  { re: /\banker\b/i,           brand: 'Anker' },
  { re: /\bbaseus\b/i,          brand: 'Baseus' },
  { re: /\bravpower\b/i,        brand: 'RAVPower' },
];

function detectBrand(name) {
  for (const rule of BRAND_RULES) {
    if (rule.re.test(name)) return rule.brand;
  }
  return '';
}

// ── CPU specs ─────────────────────────────────────────────────────────────────
function detectCpuSpecs(name) {
  const specs = {};
  // Socket
  if (/\bAM5\b/i.test(name))   specs.socket = 'AM5';
  else if (/\bAM4\b/i.test(name))  specs.socket = 'AM4';
  else if (/\bLGA\s*1700\b/i.test(name)) specs.socket = 'LGA1700';
  else if (/\bLGA\s*1200\b/i.test(name)) specs.socket = 'LGA1200';
  else if (/\bLGA\s*1151\b/i.test(name)) specs.socket = 'LGA1151';
  else if (/\bLGA\s*2066\b/i.test(name)) specs.socket = 'LGA2066';
  // Infer socket from generation
  else if (/\bRyzen\s*[3579]\s*[789]\d{3}\b/i.test(name)) specs.socket = 'AM5'; // 7000 series
  else if (/\bRyzen\s*[3579]\s*[56]\d{3}\b/i.test(name))  specs.socket = 'AM4'; // 5000/6000 series
  else if (/\bRyzen\s*[3579]\s*3\d{3}\b/i.test(name))     specs.socket = 'AM4'; // 3000 series
  else if (/Core\s*i[3579][- ]*1[23]\d{3}/i.test(name))   specs.socket = 'LGA1700'; // 12th/13th gen
  else if (/Core\s*i[3579][- ]*1[01]\d{3}/i.test(name))   specs.socket = 'LGA1200'; // 10th/11th gen

  // Cores
  const coreMatch = name.match(/(\d+)\s*-?\s*Cores?\b/i);
  if (coreMatch) specs.cores = coreMatch[1];

  // Integrated graphics
  if (/Radeon\s*Graphics|Intel\s*UHD|Intel\s*Iris|integrated/i.test(name)) specs.integratedGraphics = 'Yes';

  return specs;
}

// ── GPU specs ─────────────────────────────────────────────────────────────────
function detectGpuSpecs(name) {
  const specs = {};

  // Chipset (try to extract RTX/RX model)
  const chipsetMatch = name.match(/\b(RTX\s*\d{4}\s*(?:Ti|Super|XT|XTX)?|GTX\s*\d{4}\s*(?:Ti|Super)?|RX\s*\d{4}\s*(?:XT|XTX)?|Arc\s*A\d{3})\b/i);
  if (chipsetMatch) specs.chipset = chipsetMatch[1].trim();

  // VRAM
  const vramMatch = name.match(/(\d+)\s*GB/i);
  if (vramMatch) specs.vram = `${vramMatch[1]}GB`;

  return specs;
}

// ── RAM specs ─────────────────────────────────────────────────────────────────
function detectRamSpecs(name) {
  const specs = {};
  if (/DDR5/i.test(name))      specs.ramType = 'DDR5';
  else if (/DDR4/i.test(name)) specs.ramType = 'DDR4';
  else if (/DDR3/i.test(name)) specs.ramType = 'DDR3';

  // Capacity
  const capMatch = name.match(/(\d+)\s*GB/i);
  if (capMatch) specs.capacity = `${capMatch[1]}GB`;

  // Speed
  const speedMatch = name.match(/(\d{4,5})\s*(?:MHz|Mbps)/i);
  if (speedMatch) specs.speed = `${speedMatch[1]}MHz`;

  return specs;
}

// ── Storage specs ─────────────────────────────────────────────────────────────
function detectStorageSpecs(name) {
  const specs = {};
  // Capacity
  const tbMatch = name.match(/(\d+(?:\.\d+)?)\s*TB/i);
  const gbMatch = name.match(/(\d+)\s*GB/i);
  if (tbMatch)      specs.capacity = `${tbMatch[1]}TB`;
  else if (gbMatch) specs.capacity = `${gbMatch[1]}GB`;

  // Interface
  if (/NVMe|M\.2\s*NVMe/i.test(name))       specs.interface = 'NVMe (M.2)';
  else if (/PCIe\s*4/i.test(name))          specs.interface = 'PCIe 4.0';
  else if (/PCIe\s*3/i.test(name))          specs.interface = 'PCIe 3.0';
  else if (/SATA\s*(?:III|3|6Gb)/i.test(name)) specs.interface = 'SATA III';
  else if (/M\.2/i.test(name))              specs.interface = 'M.2';

  return specs;
}

// ── HDD specs ─────────────────────────────────────────────────────────────────
function detectHddSpecs(name) {
  const specs = detectStorageSpecs(name);
  const rpmMatch = name.match(/(\d{4})\s*RPM/i);
  if (rpmMatch) specs.rpm = `${rpmMatch[1]}RPM`;
  return specs;
}

// ── Motherboard specs ─────────────────────────────────────────────────────────
function detectMoboSpecs(name) {
  const specs = {};
  if (/\bAM5\b/i.test(name))            specs.socket = 'AM5';
  else if (/\bAM4\b/i.test(name))       specs.socket = 'AM4';
  else if (/\bLGA\s*1700\b/i.test(name)) specs.socket = 'LGA1700';
  else if (/\bLGA\s*1200\b/i.test(name)) specs.socket = 'LGA1200';

  if (/E-ATX|Extended\s*ATX/i.test(name))  specs.formFactor = 'E-ATX';
  else if (/Micro.?ATX|mATX|m-ATX/i.test(name)) specs.formFactor = 'Micro-ATX';
  else if (/Mini.?ITX/i.test(name))         specs.formFactor = 'Mini-ITX';
  else if (/\bATX\b/i.test(name))           specs.formFactor = 'ATX';

  return specs;
}

// ── PSU specs ─────────────────────────────────────────────────────────────────
function detectPsuSpecs(name) {
  const specs = {};
  const wMatch = name.match(/(\d{3,4})\s*W\b/i);
  if (wMatch) specs.wattage = `${wMatch[1]}W`;

  if (/80\+?\s*Titanium/i.test(name))   specs.efficiency = '80+ Titanium';
  else if (/80\+?\s*Platinum/i.test(name)) specs.efficiency = '80+ Platinum';
  else if (/80\+?\s*Gold/i.test(name))  specs.efficiency = '80+ Gold';
  else if (/80\+?\s*Silver/i.test(name)) specs.efficiency = '80+ Silver';
  else if (/80\+?\s*Bronze/i.test(name)) specs.efficiency = '80+ Bronze';
  else if (/80\+?\s*White/i.test(name))  specs.efficiency = '80+ White';
  else if (/80\+/i.test(name))           specs.efficiency = '80+';

  if (/Fully\s*Modular/i.test(name))    specs.modular = 'Fully Modular';
  else if (/Semi\s*Modular/i.test(name)) specs.modular = 'Semi Modular';
  else if (/Non.Modular/i.test(name))   specs.modular = 'Non-Modular';

  return specs;
}

// ── Case specs ────────────────────────────────────────────────────────────────
function detectCasingSpecs(name) {
  const specs = {};
  if (/Full\s*Tower/i.test(name))          specs.formFactor = 'Full Tower';
  else if (/Mid\s*Tower|Midi\s*Tower/i.test(name)) specs.formFactor = 'Mid Tower';
  else if (/Mini\s*Tower/i.test(name))      specs.formFactor = 'Mini Tower';
  else if (/Mini.?ITX/i.test(name))         specs.formFactor = 'Mini-ITX';
  return specs;
}

// ── Cooler specs ──────────────────────────────────────────────────────────────
function detectCoolerSpecs(name) {
  const specs = {};
  if (/AIO|Liquid|360|240|280|120/i.test(name)) specs.coolerType = 'AIO Liquid';
  else                                           specs.coolerType = 'Air';

  if (/\bAM5\b/i.test(name))              specs.socket = 'AM5, AM4';
  else if (/\bAM4\b/i.test(name))         specs.socket = 'AM4';
  else if (/\bLGA\s*1700\b/i.test(name))  specs.socket = 'LGA1700';

  return specs;
}

// ── Color ─────────────────────────────────────────────────────────────────────
function detectColor(name) {
  if (/\bBlack\b/i.test(name) && /\bWhite\b/i.test(name)) return 'Black & White';
  if (/\bBlack\b/i.test(name))  return 'Black';
  if (/\bWhite\b/i.test(name))  return 'White';
  if (/\bSilver\b/i.test(name)) return 'Silver';
  if (/\bGrey\b|\bGray\b/i.test(name)) return 'Grey';
  if (/\bRed\b/i.test(name))    return 'Red';
  if (/\bBlue\b/i.test(name))   return 'Blue';
  if (/\bGreen\b/i.test(name))  return 'Green';
  if (/\bGold\b/i.test(name))   return 'Gold';
  if (/\bRGB\b/i.test(name))    return 'RGB';
  return '';
}

// ── Main runner ───────────────────────────────────────────────────────────────
async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected:', process.env.MONGO_URI);

  const products = await Product.find({ deleted_at: null });
  console.log(`Processing ${products.length} products...\n`);

  let updated = 0;

  for (const p of products) {
    const name = p.name;
    const changes = { specs: { ...(p.specs || {}) } };
    let dirty = false;

    // ── Brand ──────────────────────────────────────────────────────────────
    const brand = detectBrand(name);
    if (brand && !p.brand) {
      changes.brand = brand;
      dirty = true;
    }

    // ── Color (universal) ─────────────────────────────────────────────────
    if (!changes.specs.color) {
      const color = detectColor(name);
      if (color) { changes.specs.color = color; dirty = true; }
    }

    // ── Category-specific specs ────────────────────────────────────────────
    let catSpecs = {};
    switch (p.category) {
      case 'cpu':    catSpecs = detectCpuSpecs(name);    break;
      case 'gpu':    catSpecs = detectGpuSpecs(name);    break;
      case 'ram':    catSpecs = detectRamSpecs(name);    break;
      case 'ssd':    catSpecs = detectStorageSpecs(name); break;
      case 'hdd':    catSpecs = detectHddSpecs(name);    break;
      case 'mobo':   catSpecs = detectMoboSpecs(name);   break;
      case 'psu':    catSpecs = detectPsuSpecs(name);    break;
      case 'casing': catSpecs = detectCasingSpecs(name); break;
      case 'cooler': catSpecs = detectCoolerSpecs(name); break;
    }

    // Merge detected specs — only fill in missing fields
    for (const [key, val] of Object.entries(catSpecs)) {
      if (val && !changes.specs[key]) {
        changes.specs[key] = val;
        dirty = true;
      }
    }

    if (dirty) {
      await Product.updateOne({ _id: p._id }, { $set: changes });
      updated++;
      console.log(`  ✓ [${p.category.toUpperCase()}] ${name.substring(0, 60)}`);
      if (changes.brand) console.log(`       brand → ${changes.brand}`);
      const newSpecs = Object.keys(changes.specs).filter(k => !p.specs?.[k]);
      if (newSpecs.length) console.log(`       specs → ${newSpecs.join(', ')}`);
    }
  }

  console.log(`\n✅ Done — updated ${updated}/${products.length} products`);
  await mongoose.disconnect();
}

run().catch(console.error);
