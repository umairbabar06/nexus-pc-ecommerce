import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductReviews from '../components/ProductReviews';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById, getProductReviews } from '../api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/imageUrl';
import './ProductDetail.css';
import '../pages/Wishlist.css';

const ProductDetail = () => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { user }    = useAuth();
  const { addToCart }      = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [qty, setQty]           = useState(1);
  const [adding, setAdding]     = useState(false);
  const [wishlisting, setWishlisting] = useState(false);
  const [avgRating, setAvgRating]     = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data.product))
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
    // Fetch review summary for the rating display
    getProductReviews(id)
      .then(res => {
        const revs = res.data.reviews || [];
        setReviewCount(revs.length);
        if (revs.length > 0) {
          setAvgRating(revs.reduce((s, r) => s + r.rating, 0) / revs.length);
        }
      })
      .catch(() => {});
  }, [id]);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addToCart(product._id, qty);
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add');
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) { navigate('/login'); return; }
    setWishlisting(true);
    try {
      const nowIn = await toggleWishlist(product._id);
      toast.success(nowIn ? '♥ Added to wishlist!' : 'Removed from wishlist');
    } catch {
      toast.error('Failed to update wishlist');
    } finally {
      setWishlisting(false);
    }
  };

  if (loading) return <div className="page-wrapper"><Navbar /><div className="spinner-container"><div className="spinner"></div></div></div>;
  if (!product) return <div className="page-wrapper"><Navbar /><div className="empty-state"><p>Product not found</p></div><Footer /></div>;

  const specs = product.specs || {};
  const imgSrc = getImageUrl(product.image);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="pd-grid">
            <div className="pd-image-box">
              <img src={imgSrc} alt={product.name} />
            </div>

            <div className="pd-info">
              <span className="badge">{product.category?.toUpperCase()}</span>
              {product.brand && <span className="pd-brand">{product.brand}</span>}
              <h1 className="pd-title">{product.name}</h1>

              {/* Average rating mini-display */}
              {avgRating !== null && (
                <div className="pd-rating-row">
                  <span className="pd-stars">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ color: s <= Math.round(avgRating) ? '#f59e0b' : '#d1d5db', fontSize: 16 }}>★</span>
                    ))}
                  </span>
                  <span className="pd-rating-text">{avgRating.toFixed(1)} ({reviewCount} review{reviewCount !== 1 ? 's' : ''})</span>
                </div>
              )}

              <p className="pd-price">PKR {product.price?.toLocaleString()} <span>/-</span></p>

              {product.description && (
                <p className="pd-desc">{product.description}</p>
              )}

              {Object.keys(specs).length > 0 && (
                <div className="pd-specs">
                  <h3 className="pd-specs-title">Specifications</h3>
                  <table className="pd-specs-table">
                    <tbody>
                      {Object.entries(specs).map(([key, val]) => (
                        <tr key={key}>
                          <td className="spec-key">{key}</td>
                          <td className="spec-val">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <p className={`pd-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✕ Out of Stock'}
              </p>

              <div className="pd-actions">
                <div className="qty-selector">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="btn btn-primary btn-lg pd-add-btn" onClick={handleAdd} disabled={adding || product.stock <= 0}>
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
                {/* Wishlist heart button */}
                <button
                  className={`wl-heart-btn ${product && isInWishlist(product._id) ? 'active' : ''}`}
                  onClick={handleWishlist}
                  disabled={wishlisting}
                  title={isInWishlist(product?._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  style={{ fontSize: 26 }}
                >
                  {isInWishlist(product?._id) ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </div>

          {/* ── Reviews section ── */}
          <ProductReviews productId={id} productName={product.name} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
