import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { verifyStripeSession } from '../api';
import { useCart } from '../context/CartContext';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const orderId = params.get('order_id');
  const { fetchCart } = useCart();
  const [status, setStatus] = useState('verifying'); // verifying | paid | failed

  useEffect(() => {
    if (!sessionId) {
      setStatus('failed');
      return;
    }

    verifyStripeSession(sessionId)
      .then((res) => {
        if (res.data.status === 'paid') {
          setStatus('paid');
          fetchCart(); // Clear cart count in navbar
        } else {
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));
  }, [sessionId]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container ps-container">
          {status === 'verifying' && (
            <div className="ps-card card">
              <div className="loading-spinner" />
              <h2>Verifying Payment...</h2>
              <p className="ps-sub">Please wait while we confirm your payment.</p>
            </div>
          )}

          {status === 'paid' && (
            <div className="ps-card card">
              <div className="ps-icon-circle success">✓</div>
              <h2>Payment Successful!</h2>
              <p className="ps-sub">Your order has been confirmed and is being processed.</p>
              {orderId && (
                <p className="ps-order-id">
                  Order ID: <span>{orderId}</span>
                </p>
              )}
              <div className="ps-actions">
                <Link to={`/track-order?id=${orderId}`} className="btn btn-primary btn-lg">
                  Track My Order
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="ps-card card">
              <div className="ps-icon-circle failed">✕</div>
              <h2>Payment Verification Failed</h2>
              <p className="ps-sub">
                We couldn't verify your payment. If money was deducted, please contact us — your order is saved and we'll resolve it.
              </p>
              {orderId && (
                <p className="ps-order-id">
                  Order ID: <span>{orderId}</span>
                </p>
              )}
              <div className="ps-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Contact Support
                </Link>
                <Link to={`/track-order?id=${orderId}`} className="btn btn-outline btn-lg">
                  Track Order
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
