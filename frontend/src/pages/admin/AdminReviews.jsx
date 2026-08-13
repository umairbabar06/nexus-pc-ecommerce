import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AdminNav from '../../components/AdminNav';
import { adminGetReviews, adminUpdateReview, adminDeleteReview } from '../../api';
import toast from 'react-hot-toast';
import './AdminReviews.css';

const STATUS_LABELS = {
  pending:  { label: 'Pending',  cls: 'badge-pending'  },
  approved: { label: 'Approved', cls: 'badge-success'  },
  rejected: { label: 'Rejected', cls: 'badge-danger'   },
};

const Stars = ({ rating }) => (
  <span className="rev-stars">
    {[1,2,3,4,5].map(s => (
      <span key={s} style={{ color: s <= rating ? '#f59e0b' : '#d1d5db' }}>★</span>
    ))}
  </span>
);

const AdminReviews = () => {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('pending'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [actionId, setActionId] = useState(null);      // which review is being actioned

  const load = () => {
    setLoading(true);
    const params = filter !== 'all' ? { status: filter } : {};
    adminGetReviews(params)
      .then(res => setReviews(res.data.reviews || []))
      .catch(() => toast.error('Failed to load reviews'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    setActionId(id);
    try {
      await adminUpdateReview(id, { status });
      toast.success(`Review ${status}`);
      setReviews(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      // Remove from list if filtering by a specific status
      if (filter !== 'all') {
        setReviews(prev => prev.filter(r => r._id !== id));
      }
    } catch {
      toast.error('Failed to update review');
    } finally {
      setActionId(null);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Permanently delete this review?')) return;
    setActionId(id);
    try {
      await adminDeleteReview(id);
      toast.success('Review deleted');
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch {
      toast.error('Failed to delete review');
    } finally {
      setActionId(null);
    }
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Manage Reviews</h2>
            <p>Moderate customer product reviews</p>
            <div className="section-divider"></div>
          </div>

          <AdminNav />

        {/* ── Filter tabs ──────────────────────────────── */}
        <div className="rev-filter-tabs">
          {['pending', 'approved', 'rejected', 'all'].map(f => (
            <button
              key={f}
              className={`rev-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'pending' && pendingCount > 0 && filter !== 'pending' && (
                <span className="rev-tab-badge">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Review list ──────────────────────────────── */}
        {loading ? (
          <div className="spinner-container"><div className="spinner" /></div>
        ) : reviews.length === 0 ? (
          <div className="empty-state">
            <p>No {filter !== 'all' ? filter : ''} reviews found.</p>
          </div>
        ) : (
          <div className="rev-admin-list">
            {reviews.map(r => (
              <div className={`rev-admin-card ${r.status}`} key={r._id}>
                {/* Card header */}
                <div className="rev-admin-card-head">
                  <div className="rev-admin-avatar">
                    {r.author_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="rev-admin-meta">
                    <span className="rev-admin-author">{r.author_name}</span>
                    <Stars rating={r.rating} />
                    <span className="rev-admin-product">
                      {r.product?.name
                        ? `on: ${r.product.name.substring(0, 50)}${r.product.name.length > 50 ? '…' : ''}`
                        : 'Product deleted'}
                    </span>
                  </div>
                  <div className="rev-admin-right">
                    <span className={`badge ${STATUS_LABELS[r.status]?.cls}`}>
                      {STATUS_LABELS[r.status]?.label}
                    </span>
                    <span className="rev-admin-date">
                      {new Date(r.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Review text */}
                <p className="rev-admin-text">"{r.review_text}"</p>

                {/* Actions */}
                <div className="rev-admin-actions">
                  {r.status !== 'approved' && (
                    <button
                      className="btn btn-sm btn-success"
                      disabled={actionId === r._id}
                      onClick={() => updateStatus(r._id, 'approved')}
                    >
                      ✓ Approve
                    </button>
                  )}
                  {r.status !== 'rejected' && (
                    <button
                      className="btn btn-sm btn-outline"
                      disabled={actionId === r._id}
                      onClick={() => updateStatus(r._id, 'rejected')}
                    >
                      ✕ Reject
                    </button>
                  )}
                  {r.status === 'approved' && (
                    <button
                      className="btn btn-sm btn-outline"
                      disabled={actionId === r._id}
                      onClick={() => updateStatus(r._id, 'pending')}
                    >
                      ↩ Set Pending
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={actionId === r._id}
                    onClick={() => deleteReview(r._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
