import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProductReviews, submitReview } from '../api';
import toast from 'react-hot-toast';
import './ProductReviews.css';

/* ── Star components ─────────────────────────────────────── */
const StarDisplay = ({ rating, size = 16 }) => (
  <span className="star-display" style={{ fontSize: size }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={s <= Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
    ))}
  </span>
);

const StarPicker = ({ value, onChange }) => (
  <div className="star-picker">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        className={`star-pick-btn ${s <= value ? 'picked' : ''}`}
        onClick={() => onChange(s)}
        aria-label={`${s} star${s > 1 ? 's' : ''}`}
      >
        ★
      </button>
    ))}
    <span className="star-pick-label">
      {value ? ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value] : 'Select rating'}
    </span>
  </div>
);

/* ── Average rating bar ─────────────────────────────────── */
const RatingBreakdown = ({ reviews }) => {
  if (!reviews.length) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="rev-breakdown">
      <div className="rev-avg-block">
        <span className="rev-avg-num">{avg.toFixed(1)}</span>
        <StarDisplay rating={avg} size={20} />
        <span className="rev-avg-label">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="rev-bars">
        {counts.map(({ star, count }) => (
          <div className="rev-bar-row" key={star}>
            <span className="rev-bar-star">{star}★</span>
            <div className="rev-bar-track">
              <div
                className="rev-bar-fill"
                style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
              />
            </div>
            <span className="rev-bar-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Time ago helper ────────────────────────────────────── */
function timeAgo(date) {
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 60)       return 'just now';
  if (diff < 3600)     return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)    return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000)  return `${Math.floor(diff / 86400)}d ago`;
  return new Date(date).toLocaleDateString();
}

/* ── Main component ─────────────────────────────────────── */
const ProductReviews = ({ productId, productName }) => {
  const { user } = useAuth();
  const [reviews, setReviews]     = useState([]);
  const [loadingRev, setLoadingRev] = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    author_name: user?.name || '',
    rating: 0,
    review_text: '',
  });

  // Keep author_name in sync when user logs in
  useEffect(() => {
    if (user?.name && !form.author_name) {
      setForm((f) => ({ ...f, author_name: user.name }));
    }
  }, [user]);

  const loadReviews = () => {
    setLoadingRev(true);
    getProductReviews(productId)
      .then((res) => setReviews(res.data.reviews || []))
      .catch(() => setReviews([]))
      .finally(() => setLoadingRev(false));
  };

  useEffect(() => { loadReviews(); }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) return toast.error('Please select a star rating');
    if (!form.author_name.trim()) return toast.error('Please enter your name');
    if (form.review_text.trim().length < 10) return toast.error('Review must be at least 10 characters');

    setSubmitting(true);
    try {
      await submitReview({
        productId,
        author_name: form.author_name.trim(),
        rating: form.rating,
        review_text: form.review_text.trim(),
      });
      setSubmitted(true);
      setShowForm(false);
      toast.success('Review submitted! It will appear after approval.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rev-section">
      <div className="rev-header">
        <h2 className="rev-title">Customer Reviews</h2>
        {!submitted && (
          <button
            className={`btn ${showForm ? 'btn-outline' : 'btn-primary'} btn-sm`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '✎ Write a Review'}
          </button>
        )}
      </div>

      {/* ── Submission form ─────────────────────────────── */}
      {showForm && (
        <form className="rev-form card" onSubmit={handleSubmit}>
          <h3 className="rev-form-title">Your Review for <em>{productName}</em></h3>

          <div className="rev-form-group">
            <label>Rating <span className="rev-required">*</span></label>
            <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
          </div>

          <div className="rev-form-group">
            <label>Your Name <span className="rev-required">*</span></label>
            <input
              type="text"
              className="form-input"
              placeholder="John Doe"
              value={form.author_name}
              onChange={(e) => setForm({ ...form, author_name: e.target.value })}
              required
              maxLength={60}
            />
          </div>

          <div className="rev-form-group">
            <label>Review <span className="rev-required">*</span></label>
            <textarea
              className="form-input rev-textarea"
              placeholder="Share your experience with this product..."
              value={form.review_text}
              onChange={(e) => setForm({ ...form, review_text: e.target.value })}
              required
              minLength={10}
              maxLength={1000}
              rows={4}
            />
            <span className="rev-char-count">{form.review_text.length}/1000</span>
          </div>

          <div className="rev-form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {/* ── Submitted confirmation ──────────────────────── */}
      {submitted && (
        <div className="rev-submitted-notice">
          ✓ Thanks for your review! It will appear here once approved.
        </div>
      )}

      {/* ── Rating breakdown ─────────────────────────────── */}
      {!loadingRev && reviews.length > 0 && <RatingBreakdown reviews={reviews} />}

      {/* ── Review list ──────────────────────────────────── */}
      {loadingRev ? (
        <div className="spinner-container" style={{ minHeight: 100 }}>
          <div className="spinner"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rev-empty">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="rev-list">
          {reviews.map((r) => (
            <div className="rev-card" key={r._id}>
              <div className="rev-card-top">
                <div className="rev-avatar">
                  {r.author_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="rev-card-meta">
                  <span className="rev-author">{r.author_name}</span>
                  <StarDisplay rating={r.rating} size={14} />
                </div>
                <span className="rev-date">{timeAgo(r.createdAt)}</span>
              </div>
              <p className="rev-text">{r.review_text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
