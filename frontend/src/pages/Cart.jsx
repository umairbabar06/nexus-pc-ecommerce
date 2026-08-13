import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Cart.css';
import SEO from '../components/SEO';
import { getImageUrl } from '../utils/imageUrl';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const imgSrc = (img) => getImageUrl(img);

  return (
    <div className="page-wrapper">
      <SEO title="Shopping Cart" description="Review items in your cart before checkout." />
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Your Cart</h2>
            <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
            <div className="section-divider"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">🛒</p>
              <p>Your cart is empty</p>
              <Link to="/products" className="btn btn-outline" style={{ marginTop: '16px' }}>Browse Products</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item card">
                    <div className="cart-item-img">
                      <img src={imgSrc(item.image)} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <p className="cart-item-cat">{item.category}</p>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">PKR {item.price?.toLocaleString()}</p>
                    </div>
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <p className="cart-item-subtotal">PKR {(item.price * item.quantity).toLocaleString()}</p>
                    <button className="cart-item-remove" onClick={() => { removeFromCart(item._id); toast.success('Removed'); }}>✕</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-tag">Free</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-price">PKR {total.toLocaleString()}</span>
                </div>
                <Link to="/checkout" className="btn btn-primary btn-block btn-lg">Proceed to Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
