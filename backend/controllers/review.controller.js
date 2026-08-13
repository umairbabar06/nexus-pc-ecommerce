const Review = require('../models/Review');

// ─────────────────────────────────────────────────────────
// @route   POST /api/reviews
// @desc    Submit a review (replaces submit_review.php)
// ─────────────────────────────────────────────────────────
exports.submitReview = async (req, res) => {
  try {
    const { productId, author_name, rating, review_text } = req.body;

    if (!productId || !author_name || !rating || !review_text) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Prevent a logged-in user from reviewing the same product twice
    if (req.user) {
      const existing = await Review.findOne({ product: productId, user: req.user._id });
      if (existing) {
        return res.status(400).json({ success: false, message: 'You have already reviewed this product.' });
      }
    }

    // Logged-in users → auto-approved; guests → pending (admin must approve)
    const status = req.user ? 'approved' : 'pending';

    const review = await Review.create({
      product: productId,
      user: req.user ? req.user._id : null,
      author_name: String(author_name).trim().substring(0, 60),
      rating: Math.min(5, Math.max(1, parseInt(rating))),
      review_text: String(review_text).trim().substring(0, 1000),
      status,
    });

    const message = req.user
      ? 'Review submitted successfully!'
      : 'Review submitted! It will appear after admin approval.';

    res.status(201).json({ success: true, message, review });
  } catch (err) {
    console.error('Submit review error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit review.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/reviews/:productId
// @desc    Get approved reviews for a product
// ─────────────────────────────────────────────────────────
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      status: 'approved',
    }).sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};

// ─────────────────────────────────────────────────────────
// @route   GET /api/reviews/latest
// @desc    Get latest reviews for homepage (replaces reviews query in index2.php)
// ─────────────────────────────────────────────────────────
exports.getLatestReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(3);

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};
