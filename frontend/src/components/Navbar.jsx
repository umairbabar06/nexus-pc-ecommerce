import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const PRODUCT_CATEGORIES = [
  { label: 'Processors (CPU)', value: 'cpu' },
  { label: 'Motherboards', value: 'mobo' },
  { label: 'Memory (RAM)', value: 'ram' },
  { label: 'Graphics Cards (GPU)', value: 'gpu' },
  { label: 'SSD Storage', value: 'ssd' },
  { label: 'HDD Storage', value: 'hdd' },
  { label: 'Power Supplies', value: 'psu' },
  { label: 'PC Cases', value: 'casing' },
  { label: 'CPU Coolers', value: 'cooler' },
];

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount }    = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productsDrop, setProductsDrop] = useState(false);
  const [builderDrop, setBuilderDrop] = useState(false);
  const productsRef = useRef(null);
  const builderRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) setProductsDrop(false);
      if (builderRef.current && !builderRef.current.contains(e.target)) setBuilderDrop(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Hamburger BEFORE logo */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>

        <Link to="/" className="navbar-logo">
          NEXUS<span>PC</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Mobile overlay */}
        {mobileOpen && <div className="mobile-overlay" onClick={closeMobile} />}

        <div className={`navbar-links ${mobileOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMobile}>Home</Link>

          {/* Products Dropdown */}
          <div className="nav-dropdown" ref={productsRef}>
            <button
              className="nav-dropdown-trigger"
              onClick={() => { setProductsDrop(!productsDrop); setBuilderDrop(false); }}
            >
              Products
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {productsDrop && (
              <div className="nav-dropdown-menu">
                <Link to="/products" onClick={() => { setProductsDrop(false); closeMobile(); }}>
                  All Products
                </Link>
                <div className="dropdown-divider" />
                {PRODUCT_CATEGORIES.map(cat => (
                  <Link
                    key={cat.value}
                    to={`/products?category=${cat.value}`}
                    onClick={() => { setProductsDrop(false); closeMobile(); }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* PC Builder Dropdown */}
          <div className="nav-dropdown" ref={builderRef}>
            <button
              className="nav-dropdown-trigger"
              onClick={() => { setBuilderDrop(!builderDrop); setProductsDrop(false); }}
            >
              PC Builder
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {builderDrop && (
              <div className="nav-dropdown-menu">
                <Link to="/pc-builder/intel" onClick={() => { setBuilderDrop(false); closeMobile(); }}>
                  Intel Custom Build
                </Link>
                <Link to="/pc-builder/amd" onClick={() => { setBuilderDrop(false); closeMobile(); }}>
                  Ryzen Custom Build
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" onClick={closeMobile}>About</Link>
          <Link to="/contact" onClick={closeMobile}>Contact</Link>
          <Link to="/customer-service" onClick={closeMobile}>Jarvis AI</Link>
          <Link to="/whatsapp" onClick={closeMobile}>WhatsApp</Link>
          {isAdmin && <Link to="/admin" onClick={closeMobile}>Admin</Link>}
        </div>

        <div className="navbar-actions">
          {/* Wishlist icon */}
          {user && (
            <Link to="/wishlist" className="navbar-cart" title="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </Link>
          )}

          {/* Cart icon */}
          <Link to="/cart" className="navbar-cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="navbar-user">
              <Link to="/account" className="user-name">{user.name?.split(' ')[0]}</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
