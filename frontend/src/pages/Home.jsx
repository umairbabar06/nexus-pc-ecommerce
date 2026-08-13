import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getFeaturedProducts, getBestSelling, getLatestReviews } from '../api';
import './Home.css';
import SEO from '../components/SEO';
import { getImageUrl } from '../utils/imageUrl';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, bestRes, reviewRes] = await Promise.all([
          getFeaturedProducts().catch(() => ({ data: { products: [] } })),
          getBestSelling().catch(() => ({ data: { products: [] } })),
          getLatestReviews().catch(() => ({ data: { reviews: [] } })),
        ]);
        setFeatured(featuredRes.data.products || []);
        setBestSelling(bestRes.data.products || []);
        setReviews(reviewRes.data.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <SEO title="Home" description="Nexus PC — Premium PC components for gamers, creators, and professionals. Build your dream rig." />
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero" style={{ backgroundImage: "url('/hero-pc.jpg')" }}>
        <div className="hero-overlay" />
        <div className="container hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              ELEVATE YOUR WORKFLOW.<br />
              <span>POWER UNCOMPROMISED.</span>
            </h1>
            <p className="hero-subtitle">
              Premium PC components curated for gamers, creators, and professionals. Build your dream rig with Nexus PC.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
              <Link to="/about" className="btn btn-outline btn-lg">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {[
              { title: 'Intel Custom Build', desc: 'Build a custom PC with Intel processors', link: '/pc-builder/intel' },
              { title: 'Ryzen Custom Build', desc: 'Build a custom PC with AMD Ryzen CPUs', link: '/pc-builder/amd' },
              { title: 'Browse All Products', desc: 'Explore our full component catalog', link: '/products' },
            ].map((cat, i) => (
              <Link to={cat.link} key={i} className="category-card">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <span className="category-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked components for your next build</p>
            <div className="section-divider"></div>
          </div>

          {loading ? (
            <div className="spinner-container"><div className="spinner"></div></div>
          ) : featured.length > 0 ? (
            <div className="product-grid">
              {featured.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={getImageUrl(product.image)} alt={product.name} loading="lazy" />
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">PKR {product.price?.toLocaleString()} <span>/-</span></p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products yet. Add products from the admin panel to get started!</p>
            </div>
          )}

          <div className="section-cta">
            <Link to="/products" className="btn btn-outline">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      {bestSelling.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2>Best Sellers</h2>
              <p>Most popular picks from our store</p>
              <div className="section-divider"></div>
            </div>
            <div className="product-grid">
              {bestSelling.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={getImageUrl(product.image)} alt={product.name} loading="lazy" />
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">PKR {product.price?.toLocaleString()} <span>/-</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEWS ── */}
      {reviews.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Customer Reviews</h2>
              <p>What our customers are saying</p>
              <div className="section-divider"></div>
            </div>
            <div className="reviews-grid">
              {reviews.map((review, i) => (
                <div key={i} className="review-card card">
                  <div className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                  <p className="review-text">"{review.review_text}"</p>
                  <p className="review-author">— {review.author_name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;
