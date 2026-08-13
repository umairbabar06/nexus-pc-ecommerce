const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Review = require('../models/Review');
const CarouselSlide = require('../models/CarouselSlide');
const multer = require('multer');
const path = require('path');

// ─── Multer config for image uploads (replaces Admin/upload/) ───
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
exports.upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// ─────────────────────────────────────────────────────────
// DASHBOARD (replaces admindashboard.php)
// ─────────────────────────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalUsers, revenueData, refundData, pendingOrders, recentOrders] =
      await Promise.all([
        Product.countDocuments({ deleted_at: null }),
        Order.countDocuments(),
        User.countDocuments(),
        Order.aggregate([
          { $match: { payment_status: 'Paid' } },
          { $group: { _id: null, total: { $sum: '$total_amount' } } },
        ]),
        Order.aggregate([
          { $match: { payment_status: 'Refunded' } },
          { $group: { _id: null, total: { $sum: '$total_amount' } } },
        ]),
        Order.countDocuments({ order_status: 'Processing' }),
        Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email'),
      ]);

    const totalRevenue = (revenueData[0]?.total || 0) - (refundData[0]?.total || 0);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue: Math.max(0, totalRevenue),
        pendingOrders,
      },
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load dashboard.' });
  }
};

// ─────────────────────────────────────────────────────────
// PRODUCTS CRUD (replaces addpro.php, updatepro.php, deletepro.php)
// ─────────────────────────────────────────────────────────
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const query = { deleted_at: null };
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Product.countDocuments(query),
    ]);

    res.json({ success: true, products, total, totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock, specs, isFeatured } = req.body;
    const image = req.file ? req.file.filename : 'default.png';

    const product = await Product.create({
      name, price: parseFloat(price), image, category: category.toLowerCase(),
      description, stock: parseInt(stock || 0),
      specs: specs ? JSON.parse(specs) : {},
      isFeatured: isFeatured === 'true',
    });

    res.status(201).json({ success: true, message: 'Product added!', product });
  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ success: false, message: 'Failed to add product.' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;
    if (updateData.specs) updateData.specs = JSON.parse(updateData.specs);
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    if (updateData.isFeatured) updateData.isFeatured = updateData.isFeatured === 'true';

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    res.json({ success: true, message: 'Product updated!', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    // Soft delete (matches your deleted_at PHP pattern)
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted_at: new Date() },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, message: 'Product moved to recycle bin.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
};

exports.restoreProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { deleted_at: null }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, message: 'Product restored!', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to restore product.' });
  }
};

exports.getRecycleBin = async (req, res) => {
  try {
    const products = await Product.find({ deleted_at: { $ne: null } }).sort({ deleted_at: -1 });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch recycle bin.' });
  }
};

exports.permanentDelete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product permanently deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
};

// Bulk soft-delete (move multiple products to recycle bin)
exports.bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No product IDs provided.' });
    }
    await Product.updateMany(
      { _id: { $in: ids } },
      { deleted_at: new Date() }
    );
    res.json({ success: true, message: `${ids.length} product(s) moved to recycle bin.` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Bulk delete failed.' });
  }
};

// Empty entire recycle bin (permanently delete all soft-deleted products)
exports.emptyRecycleBin = async (req, res) => {
  try {
    const result = await Product.deleteMany({ deleted_at: { $ne: null } });
    res.json({ success: true, message: `${result.deletedCount} product(s) permanently deleted.` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to empty recycle bin.' });
  }
};

// Bulk restore multiple products from recycle bin
exports.bulkRestoreProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No product IDs provided.' });
    }
    await Product.updateMany(
      { _id: { $in: ids } },
      { deleted_at: null }
    );
    res.json({ success: true, message: `${ids.length} product(s) restored.` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Bulk restore failed.' });
  }
};

// ─────────────────────────────────────────────────────────
// ORDERS (replaces manageorders.php, update_order.php)
// ─────────────────────────────────────────────────────────
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.order_status = status;

    if (search) {
      const searchStr = search.trim();
      const searchConditions = [
        { customer_name: { $regex: searchStr, $options: 'i' } },
        { customer_email: { $regex: searchStr, $options: 'i' } },
        { tracking_number: { $regex: searchStr, $options: 'i' } }
      ];

      // If they search by the short 8-char ID (or any ID substring)
      // We must use $expr with $toString to run a regex against an ObjectId
      searchConditions.push({
        $expr: {
          $regexMatch: {
            input: { $toString: "$_id" },
            regex: searchStr,
            options: "i"
          }
        }
      });

      query.$or = searchConditions;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('user', 'name email'),
      Order.countDocuments(query),
    ]);

    res.json({ success: true, orders, total, totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error('Order search error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_status, tracking_number } = req.body;
    const update = {};
    if (order_status) update.order_status = order_status;
    if (tracking_number) update.tracking_number = tracking_number;

    // Auto-sync payment_status based on order_status
    if (order_status === 'Delivered') {
      update.payment_status = 'Paid';
    } else if (order_status === 'Cancelled') {
      // Only mark as Refunded if it was previously Paid
      const existing = await Order.findById(req.params.id);
      if (existing && existing.payment_status === 'Paid') {
        update.payment_status = 'Refunded';
      }
    }

    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    res.json({ success: true, message: 'Order updated!', order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update order.' });
  }
};

// ─────────────────────────────────────────────────────────
// USERS (replaces manageusers.php, update_users.php)
// ─────────────────────────────────────────────────────────
exports.getAllUsers = async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      User.countDocuments(query),
    ]);

    res.json({ success: true, users, total, totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, user_role, is_verified } = req.body;
    const update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (user_role) update.user_role = user_role;
    if (is_verified !== undefined) update.is_verified = is_verified;

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    res.json({ success: true, message: 'User updated!', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete user.' });
  }
};

// ─────────────────────────────────────────────────────────
// REVIEWS (replaces managereviews.php)
// ─────────────────────────────────────────────────────────
exports.getAllReviews = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) query.status = status;

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .populate('product', 'name')
      .populate('user', 'name email');

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.json({ success: true, message: `Review ${req.body.status}!`, review });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update review.' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete review.' });
  }
};

// ─────────────────────────────────────────────────────────
// CAROUSEL (replaces managecarousels.php)
// ─────────────────────────────────────────────────────────
exports.getCarouselSlides = async (req, res) => {
  try {
    const slides = await CarouselSlide.find().sort({ display_order: 1 });
    res.json({ success: true, slides });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch slides.' });
  }
};

exports.addCarouselSlide = async (req, res) => {
  try {
    const { title, subtitle, link, button_text, display_order, status } = req.body;
    const image = req.file ? req.file.filename : '';

    const slide = await CarouselSlide.create({
      title, subtitle, image, link, button_text,
      display_order: parseInt(display_order || 0), status,
    });

    res.status(201).json({ success: true, message: 'Slide added!', slide });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add slide.' });
  }
};

exports.updateCarouselSlide = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.image = req.file.filename;

    const slide = await CarouselSlide.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!slide) return res.status(404).json({ success: false, message: 'Slide not found.' });

    res.json({ success: true, message: 'Slide updated!', slide });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update slide.' });
  }
};

exports.deleteCarouselSlide = async (req, res) => {
  try {
    await CarouselSlide.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Slide deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete slide.' });
  }
};

// ─────────────────────────────────────────────────────────
// INVENTORY (replaces manageinventory.php, ajax_update_stock.php)
// ─────────────────────────────────────────────────────────
exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock: parseInt(stock) },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, message: 'Stock updated!', product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update stock.' });
  }
};

exports.getLowStock = async (req, res) => {
  try {
    const products = await Product.find({ deleted_at: null, stock: { $lte: 5 } })
      .sort({ stock: 1 });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch low stock.' });
  }
};

// ─────────────────────────────────────────────────────────
// AUTO PRICE SYNC — uses Gemini AI + Google Search
// ─────────────────────────────────────────────────────────
exports.autoPriceSync = async (req, res) => {
  try {
    let GoogleGenAI;
    try { ({ GoogleGenAI } = require('@google/genai')); } catch { }

    if (!GoogleGenAI || !process.env.GEMINI_API_KEY) {
      return res.status(400).json({ 
        success: false, 
        message: 'Gemini API key not configured. Add GEMINI_API_KEY to .env' 
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { category } = req.query;

    // Build query — optionally filter by category
    const query = { deleted_at: null };
    if (category) query.category = category;

    const products = await Product.find(query).select('name price category');
    if (!products.length) {
      return res.json({ success: true, message: 'No products found.', updated: 0 });
    }

    // Build a single prompt with all product names for efficiency
    const productList = products.map((p, i) => `${i + 1}. ${p.name}`).join('\n');

    const prompt = `You are a price lookup tool. Search Google for the current retail price of each product below in Pakistan (PKR). Return ONLY a numbered list with the price as a plain number. No text, no currency symbol, no commas. If you cannot find a price, write "SKIP".

Products:
${productList}

Reply format (numbers only):
1. 35000
2. 85000
3. SKIP`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const responseText = response.text || '';
    const lines = responseText.split('\n').map(l => l.trim()).filter(Boolean);

    let updated = 0;
    let skipped = 0;
    let results = [];

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // Find the matching line by number
      const line = lines.find(l => l.startsWith(`${i + 1}.`) || l.startsWith(`${i + 1})`));
      
      if (!line) {
        skipped++;
        results.push({ name: product.name, status: 'no response' });
        continue;
      }

      // Extract number from line
      const priceMatch = line.replace(/^[\d]+[.)]\s*/, '').trim();
      
      if (priceMatch.toUpperCase() === 'SKIP') {
        skipped++;
        results.push({ name: product.name, status: 'skipped' });
        continue;
      }

      const newPrice = parseInt(priceMatch.replace(/[^0-9]/g, ''));
      
      if (!newPrice || newPrice < 100) {
        skipped++;
        results.push({ name: product.name, status: 'invalid price' });
        continue;
      }

      // Don't update if price change is more than 80% (safety check)
      if (product.price && Math.abs(newPrice - product.price) / product.price > 0.8) {
        skipped++;
        results.push({ 
          name: product.name, 
          status: `too large change: ${product.price} → ${newPrice}` 
        });
        continue;
      }

      const oldPrice = product.price;
      product.price = newPrice;
      await product.save();
      updated++;
      results.push({ name: product.name, status: 'updated', oldPrice, newPrice });
    }

    res.json({
      success: true,
      message: `Synced ${updated} prices. ${skipped} skipped.`,
      updated,
      skipped,
      total: products.length,
      results,
    });
  } catch (err) {
    console.error('Auto price sync error:', err);
    res.status(500).json({ success: false, message: 'Price sync failed: ' + err.message });
  }
};
