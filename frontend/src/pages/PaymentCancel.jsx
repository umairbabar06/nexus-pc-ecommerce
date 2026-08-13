import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './PaymentSuccess.css';

const PaymentCancel = () => {
  const [params] = useSearchParams();
  const orderId = params.get('order_id');

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container ps-container">
          <div className="ps-card card">
            <div className="ps-icon-circle failed">✕</div>
            <h2>Payment Cancelled</h2>
            <p className="ps-sub">
              Your payment was cancelled. Your order is saved — you can try again or choose a different payment method.
            </p>
            {orderId && (
              <p className="ps-order-id">
                Order ID: <span>{orderId}</span>
              </p>
            )}
            <div className="ps-actions">
              <Link to="/checkout" className="btn btn-primary btn-lg">
                Back to Checkout
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
