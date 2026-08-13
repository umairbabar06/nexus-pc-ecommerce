const Order = require('../models/Order');
const Cart = require('../models/Cart');
const sendEmail = require('../utils/sendEmail');

// ─────────────────────────────────────────────────────────
// @route   POST /api/orders/checkout
// @desc    Place an order (replaces checkout.php place_order)
// ─────────────────────────────────────────────────────────
exports.placeOrder = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_address, payment_method, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items to order.' });
    }

    // Calculate total
    const total_amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Normalize payment method (accept 'card' as alias for 'stripe' for backward compat)
    const normalizedMethod = payment_method === 'card' ? 'stripe' : payment_method;

    // Create order
    const order = await Order.create({
      user: req.user ? req.user._id : null,
      customer_name,
      customer_email,
      customer_address,
      items: items.map((item) => ({
        product: item.product || item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
      })),
      total_amount,
      payment_method: normalizedMethod,
    });

    // Clear cart after order (replaces DELETE FROM cart_items in checkout.php)
    if (req.user) {
      const cart = await Cart.findOne({ user: req.user._id });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
    }

    // Send order confirmation email
    const orderEmailHtml = `
      <div style="background:#000; color:#fff; padding:30px; font-family:Arial,sans-serif; border:1px solid #333;">
        <h1 style="color:#fff; border-bottom:2px solid #fff; padding-bottom:10px;">Nexus PC</h1>
        <h2>Order Confirmed!</h2>
        <p>Hello <b>${customer_name}</b>,</p>
        <p>Your order <b>#${order._id}</b> has been placed successfully.</p>
        <div style="background:#111; padding:15px; border-left:4px solid #fff; margin:10px 0;">
          <b>Total:</b> PKR ${total_amount.toLocaleString()}<br/>
          <b>Payment:</b> ${{ cod: 'Cash on Delivery', stripe: 'Card (Stripe)', jazzcash: 'JazzCash', easypaisa: 'Easypaisa', bank_transfer: 'Bank Transfer' }[normalizedMethod] || normalizedMethod}<br/>
          <b>Items:</b> ${items.length} product(s)
        </div>
        <p style="color:#888; font-size:12px;">Thank you for shopping with Nexus PC!</p>
      </div>
    `;

    try {
      await sendEmail({ to: customer_email, subject: `Order Confirmed #${order._id} - Nexus PC`, html: orderEmailHtml });
    } catch (emailErr) {
      console.error('Order email failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: {
        _id: order._id,
        total_amount: order.total_amount,
        payment_method: order.payment_method,
        order_status: order.order_status,
      },
    });
  } catch (err) {
    console.error('Place order error:', err);
    res.status(500).json({ success: false, message: 'Failed to place order.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/orders/my-orders
// @desc    Get user's orders (replaces account.php order listing)
// ─────────────────────────────────────────────────────────
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/orders/track/:id
// @desc    Track an order (replaces track_order.php)
// ─────────────────────────────────────────────────────────
exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({
      success: true,
      order: {
        _id: order._id,
        order_status: order.order_status,
        payment_status: order.payment_status,
        total_amount: order.total_amount,
        tracking_number: order.tracking_number,
        items: order.items,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to track order.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/orders/:id
// @desc    Get single order details
// ─────────────────────────────────────────────────────────
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch order.' });
  }
};
