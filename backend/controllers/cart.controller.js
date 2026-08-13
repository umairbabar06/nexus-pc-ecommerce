const Cart = require('../models/Cart');
const Product = require('../models/Product');

// ─────────────────────────────────────────────────────────
// @route   GET /api/cart
// @desc    Get user's cart (replaces cart.php)
// ─────────────────────────────────────────────────────────
exports.getCart = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = req.headers['x-session-id'];
      if (sessionId) cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.json({ success: true, items: [], totalPrice: 0 });
    }

    res.json({
      success: true,
      items: cart.items,
      totalPrice: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch cart.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   POST /api/cart/add
// @desc    Add item to cart (replaces add_to_cart.php)
// ─────────────────────────────────────────────────────────
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Fetch the product
    const product = await Product.findById(productId);
    if (!product || product.deleted_at) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Find or create cart
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
      if (!cart) cart = new Cart({ user: req.user._id, items: [] });
    } else {
      const sessionId = req.headers['x-session-id'] || `guest_${Date.now()}`;
      cart = await Cart.findOne({ sessionId });
      if (!cart) cart = new Cart({ sessionId, items: [] });
    }

    // Check if product already in cart
    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += parseInt(quantity);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: parseInt(quantity),
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Product added to cart!',
      cart_item_count: cart.items.length,
      items: cart.items,
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ success: false, message: 'Failed to add to cart.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   PUT /api/cart/update/:itemId
// @desc    Update item quantity (replaces manage_cart.php)
// ─────────────────────────────────────────────────────────
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    let cart;

    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = req.headers['x-session-id'];
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart.' });
    }

    if (quantity <= 0) {
      cart.items.pull(req.params.itemId);
    } else {
      item.quantity = parseInt(quantity);
    }

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ success: false, message: 'Failed to update cart.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart (replaces manage_cart.php delete)
// ─────────────────────────────────────────────────────────
exports.removeFromCart = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = req.headers['x-session-id'];
      cart = await Cart.findOne({ sessionId });
    }

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }

    cart.items.pull(req.params.itemId);
    await cart.save();

    res.json({ success: true, message: 'Item removed.', items: cart.items });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove item.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// ─────────────────────────────────────────────────────────
exports.clearCart = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else {
      const sessionId = req.headers['x-session-id'];
      cart = await Cart.findOne({ sessionId });
    }

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ success: true, message: 'Cart cleared.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to clear cart.' });
  }
};
