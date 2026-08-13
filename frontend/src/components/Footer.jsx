import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">NEXUS<span>PC</span></h3>
            <p>Build your dream rig with premium PC components. Quality parts, competitive prices.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <Link to="/products?category=cpu">Processors</Link>
            <Link to="/products?category=gpu">Graphics Cards</Link>
            <Link to="/products?category=ram">Memory</Link>
            <Link to="/products?category=mobo">Motherboards</Link>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/track-order">Track Order</Link>
            <Link to="/contact">Help Center</Link>
            <Link to="/account">My Account</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nexus PC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
