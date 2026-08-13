const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  getWishlistIds,
} = require('../controllers/wishlist.controller');

// All wishlist routes require authentication
router.use(protect);

router.get('/',                   getWishlist);         // GET    /api/wishlist
router.get('/ids',                getWishlistIds);      // GET    /api/wishlist/ids
router.post('/:productId',        addToWishlist);       // POST   /api/wishlist/:productId
router.delete('/clear',           clearWishlist);       // DELETE /api/wishlist/clear
router.delete('/:productId',      removeFromWishlist);  // DELETE /api/wishlist/:productId

module.exports = router;
