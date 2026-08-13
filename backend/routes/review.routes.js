const express = require('express');
const router = express.Router();
const { submitReview, getProductReviews, getLatestReviews } = require('../controllers/review.controller');

router.post('/',             submitReview);       // POST /api/reviews
router.get('/latest',        getLatestReviews);   // GET /api/reviews/latest (homepage)
router.get('/:productId',   getProductReviews);   // GET /api/reviews/:productId

module.exports = router;
