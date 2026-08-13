import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container nf-container">
          <div className="nf-glitch" data-text="404">404</div>
          <h2 className="nf-title">Page Not Found</h2>
          <p className="nf-subtitle">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="nf-actions">
            <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
            <Link to="/products" className="btn btn-outline btn-lg">Browse Products</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
