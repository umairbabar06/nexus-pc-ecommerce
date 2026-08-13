const Wishlist = require('../models/Wishlist');
require('../models/Product'); // ensure Product schema is registered for populate()

// @route   GET /api/wishlist
// @desc    Get logged-in user's wishlist (populated products)
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products', 'name price image category brand stock deleted_at');

    // Filter out any soft-deleted products
    const products = (wishlist?.products || []).filter(p => !p.deleted_at);

    res.json({ success: true, products, count: products.length });
  } catch (err) {
    console.error('Get wishlist error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch wishlist.' });
  }
};

// @route   POST /api/wishlist/:productId
// @desc    Add a product to wishlist (idempotent — no duplicate if already in)
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { products: productId } }, // $addToSet prevents duplicates
      { upsert: true, new: true }
    ).populate('products', 'name price image category brand stock');

    res.json({
      success: true,
      message: 'Added to wishlist!',
      count: wishlist.products.length,
    });
  } catch (err) {
    console.error('Add to wishlist error:', err);
    res.status(500).json({ success: false, message: 'Failed to add to wishlist.' });
  }
};

// @route   DELETE /api/wishlist/:productId
// @desc    Remove a product from wishlist
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { products: productId } },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Removed from wishlist.',
      count: wishlist?.products?.length || 0,
    });
  } catch (err) {
    console.error('Remove from wishlist error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove from wishlist.' });
  }
};

// @route   DELETE /api/wishlist
// @desc    Clear entire wishlist
// @access  Private
exports.clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $set: { products: [] } }
    );
    res.json({ success: true, message: 'Wishlist cleared.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to clear wishlist.' });
  }
};

// @route   GET /api/wishlist/ids
// @desc    Get just the product IDs in wishlist (lightweight — for heart-icon state)
// @access  Private
exports.getWishlistIds = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).select('products');
    res.json({ success: true, ids: wishlist?.products?.map(String) || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch wishlist ids.' });
  }
};
