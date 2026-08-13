const mongoose = require('mongoose');

/**
 * Order Model — replaces `orders` + `order_items` MySQL tables
 * Order items are embedded inside the order document
 */
const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  image:    { type: String },
  category: { type: String },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null for guest orders
    },
    // Shipping info (from checkout.php form)
    customer_name:    { type: String, required: true },
    customer_email:   { type: String, required: true },
    customer_address: { type: String, required: true },
    // Items array (replaces order_items table)
    items: [orderItemSchema],
    total_amount: { type: Number, required: true },
    // Payment (replaces process_payment.php logic)
    payment_method: {
      type: String,
      enum: ['cod', 'stripe', 'jazzcash', 'easypaisa', 'bank_transfer'],
      default: 'cod',
    },
    payment_status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    // Gateway transaction reference (Stripe session/payment_intent ID, JazzCash txn ID, etc.)
    payment_ref: { type: String, default: null },
    // Order status (managed from manageorders.php / admin panel)
    order_status: {
      type: String,
      enum: ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
    // Tracking (from track_order.php)
    tracking_number: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
