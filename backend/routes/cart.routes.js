const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

// Optional auth — cart works for guests too (uses x-session-id header)
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
};

router.get('/',              optionalAuth, getCart);           // GET /api/cart
router.post('/add',          optionalAuth, addToCart);         // POST /api/cart/add
router.put('/update/:itemId', optionalAuth, updateCartItem);  // PUT /api/cart/update/:itemId
router.delete('/remove/:itemId', optionalAuth, removeFromCart); // DELETE /api/cart/remove/:itemId
router.delete('/clear',      optionalAuth, clearCart);         // DELETE /api/cart/clear

module.exports = router;
