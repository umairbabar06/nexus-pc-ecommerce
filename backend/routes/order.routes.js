const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, trackOrder, getOrderById } = require('../controllers/order.controller');
const { protect } = require('../middleware/auth.middleware');

// Optional auth for checkout (guest checkout support)
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
};

router.post('/checkout',     optionalAuth, placeOrder);  // POST /api/orders/checkout
router.get('/my-orders',     protect,      getMyOrders);  // GET /api/orders/my-orders (must be logged in)
router.get('/track/:id',                   trackOrder);   // GET /api/orders/track/:id (public)
router.get('/:id',           protect,      getOrderById); // GET /api/orders/:id

module.exports = router;
