import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getWishlist } from '../api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/imageUrl';
import './Wishlist.css';

const Wishlist = () => {
  const { user }           = useAuth();
  const { toggleWishlist } = useWishlist();
  const { addToCart }      = useCart();
  const navigate           = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [adding, setAdding]     = useState(null); // productId being added to cart

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getWishlist()
      .then(res => setProducts(res.data.products || []))
      .catch(err => {
        console.error('Wishlist load error:', err.response?.status, err.response?.data, err.message);
        toast.error('Failed to load wishlist');
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (productId) => {
    await toggleWishlist(productId);
    setProducts(prev => prev.filter(p => p._id !== productId));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = async (product) => {
    setAdding(product._id);
    try {
      await addToCart(product._id, 1);
      toast.success(`${product.name.substring(0, 30)}... added to cart!`);
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setAdding(null);
    }
  };

  const imgSrc = (img) => getImageUrl(img);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>My Wishlist</h2>
            <p>{products.length} item{products.length !== 1 ? 's' : ''} saved</p>
            <div className="section-divider" />
          </div>

          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <div className="wl-empty">
              <div className="wl-empty-icon">♡</div>
              <h3>Your wishlist is empty</h3>
              <p>Save products you love so you can find them later.</p>
              <Link to="/products" className="btn btn-primary">Browse Products</Link>
            </div>
          ) : (
            <>
              <div className="wl-grid">
                {products.map(p => (
                  <div className="wl-card" key={p._id}>
                    {/* Remove button */}
                    <button
                      className="wl-remove-btn"
                      onClick={() => handleRemove(p._id)}
                      title="Remove from wishlist"
                    >
                      ×
                    </button>

                    {/* Product image */}
                    <Link to={`/products/${p._id}`} className="wl-image-link">
                      <div className="wl-image">
                        <img src={imgSrc(p.image)} alt={p.name} />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="wl-info">
                      <span className="wl-category">{p.category?.toUpperCase()}</span>
                      {p.brand && <span className="wl-brand">{p.brand}</span>}
                      <Link to={`/products/${p._id}`} className="wl-name">{p.name}</Link>
                      <p className="wl-price">PKR {p.price?.toLocaleString()}</p>

                      <p className={`wl-stock ${p.stock > 0 ? 'in' : 'out'}`}>
                        {p.stock > 0 ? `✓ In Stock` : '✕ Out of Stock'}
                      </p>

                      <button
                        className="btn btn-primary wl-cart-btn"
                        disabled={p.stock <= 0 || adding === p._id}
                        onClick={() => handleAddToCart(p)}
                      >
                        {adding === p._id ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="wl-actions-footer">
                <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
