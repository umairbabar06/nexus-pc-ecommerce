import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { placeOrder, createStripeSession, getBankDetails } from '../api';
import toast from 'react-hot-toast';
import './Checkout.css';

const PAYMENT_METHODS = [
  { id: 'cod',           icon: '💵', label: 'Cash on Delivery',  desc: 'Pay when you receive',  available: true },
  { id: 'stripe',        icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex', available: true },
  { id: 'jazzcash',      icon: '📱', label: 'JazzCash',          desc: 'Mobile wallet',          available: false },
  { id: 'easypaisa',     icon: '📱', label: 'Easypaisa',         desc: 'Mobile wallet',          available: false },
  { id: 'bank_transfer', icon: '🏦', label: 'Bank Transfer',     desc: 'Direct bank transfer',   available: true },
];

const Checkout = () => {
  const { cartItems, fetchCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_address: '',
    payment_method: 'cod',
  });
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [showBankInfo, setShowBankInfo] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const imgSrc = (img) => img?.startsWith('http') ? img : `${apiBase}/uploads/${img}`;

  // Prefetch bank details when bank_transfer is selected
  useEffect(() => {
    if (form.payment_method === 'bank_transfer' && !bankDetails) {
      getBankDetails().then(res => setBankDetails(res.data)).catch(() => {});
    }
  }, [form.payment_method]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error('Cart is empty');
    setLoading(true);

    try {
      // 1. Place the order (all methods create the order first)
      const res = await placeOrder({ ...form, items: cartItems });
      const order = res.data.order;

      // 2. Handle payment based on method
      switch (form.payment_method) {
        case 'stripe': {
          // Create Stripe session & redirect
          const stripeRes = await createStripeSession({ orderId: order._id });
          if (stripeRes.data.url) {
            window.location.href = stripeRes.data.url;
            return; // Don't clear loading — user is redirecting
          }
          break;
        }

        case 'bank_transfer': {
          // Show bank details with order reference
          toast.success('Order placed! Transfer the amount to complete.');
          fetchCart();
          setPlacedOrder(order);
          setShowBankInfo(true);
          setLoading(false);
          return;
        }

        case 'jazzcash':
        case 'easypaisa':
          toast.error('This payment method is coming soon.');
          setLoading(false);
          return;

        default: // cod
          toast.success('Order placed!');
          fetchCart();
          navigate(`/track-order?id=${order._id}`);
          return;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  // ── Bank Transfer Confirmation UI ──
  if (showBankInfo && placedOrder && bankDetails) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="page-content">
          <div className="container">
            <div className="section-header">
              <h2>Bank Transfer Details</h2>
              <div className="section-divider"></div>
            </div>

            <div className="bank-info-layout">
              <div className="bank-details-card card">
                <div className="bank-header">
                  <span className="bank-icon">🏦</span>
                  <h3>Transfer to This Account</h3>
                </div>
                <div className="bank-fields">
                  <div className="bank-field">
                    <span className="bank-label">Bank Name</span>
                    <span className="bank-value">{bankDetails.bankDetails.bankName}</span>
                  </div>
                  <div className="bank-field">
                    <span className="bank-label">Account Title</span>
                    <span className="bank-value">{bankDetails.bankDetails.accountTitle}</span>
                  </div>
                  <div className="bank-field">
                    <span className="bank-label">Account Number</span>
                    <span className="bank-value bank-mono">{bankDetails.bankDetails.accountNumber}</span>
                  </div>
                  <div className="bank-field">
                    <span className="bank-label">IBAN</span>
                    <span className="bank-value bank-mono">{bankDetails.bankDetails.iban}</span>
                  </div>
                  <div className="bank-field bank-field-highlight">
                    <span className="bank-label">Amount to Transfer</span>
                    <span className="bank-value bank-amount">PKR {placedOrder.total_amount.toLocaleString()}</span>
                  </div>
                  <div className="bank-field bank-field-highlight">
                    <span className="bank-label">Payment Reference</span>
                    <span className="bank-value bank-mono">{placedOrder._id}</span>
                  </div>
                </div>

                <div className="bank-instructions">
                  <h4>📋 Instructions</h4>
                  <ol>
                    {bankDetails.instructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ol>
                </div>

                <button
                  className="btn btn-primary btn-block btn-lg"
                  onClick={() => navigate(`/track-order?id=${placedOrder._id}`)}
                >
                  Track My Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Checkout UI ──
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Checkout</h2>
            <div className="section-divider"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-state"><p>No items to checkout</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="checkout-layout">
              <div className="checkout-form card">
                <h3 className="checkout-section-title">Shipping Information</h3>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input name="customer_name" className="form-input" placeholder="Your full name" value={form.customer_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input name="customer_email" type="email" className="form-input" placeholder="you@example.com" value={form.customer_email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea name="customer_address" className="form-input" placeholder="Full shipping address" value={form.customer_address} onChange={handleChange} required />
                </div>

                <h3 className="checkout-section-title" style={{ marginTop: '28px' }}>Payment Method</h3>
                <div className="payment-methods-grid">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`payment-method-card${form.payment_method === method.id ? ' selected' : ''}${!method.available ? ' disabled' : ''}`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={form.payment_method === method.id}
                        onChange={handleChange}
                        disabled={!method.available}
                      />
                      <span className="pm-icon">{method.icon}</span>
                      <span className="pm-label">{method.label}</span>
                      <span className="pm-desc">{method.desc}</span>
                      {!method.available && <span className="pm-badge">Coming Soon</span>}
                      {form.payment_method === method.id && <span className="pm-check">✓</span>}
                    </label>
                  ))}
                </div>
              </div>

              <div className="checkout-summary card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="checkout-items">
                  {cartItems.map(item => (
                    <div key={item._id} className="checkout-item">
                      <div className="checkout-item-img">
                        <img src={imgSrc(item.image)} alt="" />
                      </div>
                      <div className="checkout-item-info">
                        <p className="checkout-item-name">{item.name}</p>
                        <p className="checkout-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="checkout-item-price">PKR {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-price">PKR {total.toLocaleString()}</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                  {loading
                    ? 'Processing...'
                    : form.payment_method === 'cod'
                      ? 'Place Order'
                      : form.payment_method === 'stripe'
                        ? 'Proceed to Payment'
                        : form.payment_method === 'bank_transfer'
                          ? 'Place Order & Get Bank Details'
                          : 'Place Order'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
