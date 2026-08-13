const mongoose = require('mongoose');

/**
 * Cart Model — replaces `carts` + `cart_items` MySQL tables
 * Items are embedded inside the cart document (no join needed)
 */
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  image:    { type: String },
  category: { type: String },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    // For logged-in users
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // For guest users (replaces PHP session_id cart)
    sessionId: {
      type: String,
      default: null,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Virtual: calculate total price
cartSchema.virtual('totalPrice').get(function () {
  return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

module.exports = mongoose.model('Cart', cartSchema);
