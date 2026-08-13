const Product = require('../models/Product');
const { getFilterKeysForCategory, CATEGORY_LABELS } = require('../config/filterConfig');

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse a comma-separated query param into a trimmed array.
 * e.g. "cpu,gpu" → ['cpu', 'gpu']
 */
function parseList(raw) {
  if (!raw) return [];
  return String(raw).split(',').map((v) => v.trim()).filter(Boolean);
}

/**
 * Build MongoDB spec filters from URL params shaped like spec_socket=AM5,AM4
 */
function buildSpecFilters(query) {
  const specFilters = {};
  Object.keys(query).forEach((key) => {
    if (!key.startsWith('spec_')) return;
    const specKey = key.slice(5);
    const values = parseList(query[key]);
    if (values.length === 0) return;
    specFilters[`specs.${specKey}`] = values.length === 1 ? values[0] : { $in: values };
  });
  return specFilters;
}

/**
 * Build the base MongoDB query from common filter params.
 * Shared between getProducts, getByCategory, and getFacets.
 */
function buildBaseQuery(queryParams) {
  const { category, search, minPrice, maxPrice, inStock, brand } = queryParams;

  const q = { deleted_at: null };

  // Category — single value OR comma-separated multi-select
  const cats = parseList(category);
  if (cats.length === 1) q.category = cats[0].toLowerCase();
  else if (cats.length > 1) q.category = { $in: cats.map((c) => c.toLowerCase()) };

  // Full-text / name search
  if (search) q.name = { $regex: search, $options: 'i' };

  // Brand — top-level field, comma-separated multi-select
  const brands = parseList(brand);
  if (brands.length === 1) q.brand = { $regex: `^${brands[0]}$`, $options: 'i' };
  else if (brands.length > 1) q.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) };

  // Price range
  if (minPrice || maxPrice) {
    q.price = {};
    if (minPrice) q.price.$gte = parseFloat(minPrice);
    if (maxPrice) q.price.$lte = parseFloat(maxPrice);
  }

  // In-stock only
  if (inStock === 'true') q.stock = { $gt: 0 };

  // Spec-level filters
  Object.assign(q, buildSpecFilters(queryParams));

  return q;
}

// ── Controllers ──────────────────────────────────────────────────────────────

// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort, featured } = req.query;

    const query = buildBaseQuery(req.query);

    // Featured override (homepage)
    if (featured === 'true') query.isFeatured = true;

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc')  sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'name')       sortOption = { name: 1 };

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      products,
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
};

// @route   GET /api/products/featured
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { deleted_at: null } },
      { $sample: { size: 15 } },
    ]);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch featured products.' });
  }
};

// @route   GET /api/products/bestselling
exports.getBestSelling = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { deleted_at: null, category: { $in: ['cpu', 'gpu', 'ram'] } } },
      { $sample: { size: 8 } },
    ]);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch best sellers.' });
  }
};

// @route   GET /api/products/search
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json({ success: true, products: [] });

    const products = await Product.find({
      name: { $regex: q, $options: 'i' },
      deleted_at: null,
    })
      .select('name price image category brand')
      .limit(10);

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed.' });
  }
};

// @route   GET /api/products/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category', { deleted_at: null });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories.' });
  }
};

// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.deleted_at) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch product.' });
  }
};

// @route   GET /api/products/category/:category
exports.getByCategory = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort } = req.query;
    const query = buildBaseQuery({ ...req.query, category: req.params.category });

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc')  sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
};

// @route   GET /api/products/facets
// @desc    Returns available filter dimensions with counts for the sidebar.
//          Includes: categories, brands, price range, and category-specific specs.
//          A filter group is only returned if ≥1 product actually has data.
exports.getFacets = async (req, res) => {
  try {
    const { category, search, brand } = req.query;

    // Base match (without category/brand so we can compute cross-dimension counts)
    const baseQuery = { deleted_at: null };
    if (search) baseQuery.name = { $regex: search, $options: 'i' };

    // Match WITH current category+brand selection (for spec facets + price range)
    const filteredQuery = buildBaseQuery(req.query);

    // ── 1. Price range ───────────────────────────────────────────────────────
    const [priceAgg] = await Product.aggregate([
      { $match: filteredQuery },
      { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } },
    ]);

    // ── 2. Categories (always show all, count based on search only) ──────────
    const catAgg = await Product.aggregate([
      { $match: baseQuery },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const categories = catAgg.map((c) => ({
      value: c._id,
      label: CATEGORY_LABELS[c._id] || c._id,
      count: c.count,
    }));

    // ── 3. Brands (filtered by current category but not brand itself) ────────
    const brandBaseQuery = { ...baseQuery };
    const cats = parseList(category);
    if (cats.length === 1) brandBaseQuery.category = cats[0].toLowerCase();
    else if (cats.length > 1) brandBaseQuery.category = { $in: cats.map((c) => c.toLowerCase()) };
    if (search) brandBaseQuery.name = { $regex: search, $options: 'i' };

    const brandAgg = await Product.aggregate([
      { $match: { ...brandBaseQuery, brand: { $exists: true, $ne: null, $ne: '' } } },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const brands = brandAgg.map((b) => ({ value: b._id, count: b.count }));

    // ── 4. Category-specific spec filters ────────────────────────────────────
    // Only run for a single selected category (specs are category-specific)
    const selectedCategory = cats.length === 1 ? cats[0] : '';
    const filterKeys = getFilterKeysForCategory(selectedCategory);

    const specFilters = [];
    for (const { key, label } of filterKeys) {
      const field = `specs.${key}`;
      const results = await Product.aggregate([
        {
          $match: {
            ...filteredQuery,
            [field]: { $exists: true, $ne: null, $ne: '' },
          },
        },
        { $group: { _id: `$${field}`, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]);

      if (results.length > 0) {
        specFilters.push({
          key,
          label,
          options: results.map((r) => ({ value: r._id, count: r.count })),
        });
      }
    }

    res.json({
      success: true,
      priceRange: { min: priceAgg?.min ?? 0, max: priceAgg?.max ?? 0 },
      categories,
      brands,
      filters: specFilters,
    });
  } catch (err) {
    console.error('Get facets error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch filters.' });
  }
};

// @route   GET /api/products/builder
exports.getBuilderProducts = async (req, res) => {
  try {
    const { category, socket, ramType, formFactor, brand } = req.query;
    if (!category) {
      return res.status(400).json({ success: false, message: 'Category is required for builder.' });
    }

    const query = { 
      category: category.toLowerCase(), 
      deleted_at: null,
      stock: { $gt: 0 }
    };

    if (brand) {
      const brands = parseList(brand);
      if (brands.length === 1) query.brand = { $regex: `^${brands[0]}$`, $options: 'i' };
      else if (brands.length > 1) query.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) };
    }

    if (socket) {
      const sockets = parseList(socket);
      query['$or'] = query['$or'] || [];
      query['$or'].push({
        $or: [
          { 'specs.socket': { $in: sockets } },
          { name: { $regex: new RegExp(sockets.join('|'), 'i') } }
        ]
      });
    }
    if (ramType) {
      query['specs.ramType'] = { $in: parseList(ramType) };
    }
    if (formFactor) {
      query['specs.formFactor'] = { $in: parseList(formFactor) };
    }

    const products = await Product.find(query)
      .select('_id name price image category brand stock specs')
      .limit(100);

    res.json({ success: true, products });
  } catch (err) {
    console.error('Get builder products error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch builder products.' });
  }
};
