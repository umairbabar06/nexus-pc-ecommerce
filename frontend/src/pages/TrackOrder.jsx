import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { trackOrder } from '../api';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/imageUrl';
import './TrackOrder.css';

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return toast.error('Enter an order ID');
    setLoading(true);
    try {
      const res = await trackOrder(orderId.trim());
      setOrder(res.data.order);
    } catch {
      toast.error('Order not found');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];
  const currentStep = order ? steps.indexOf(order.order_status) : -1;
  const imgSrc = (img) => getImageUrl(img);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container track-container">
          <div className="section-header track-header">
            <h2>Track Your Order</h2>
            <p>Enter your order ID to check status</p>
            <div className="section-divider" style={{ margin: '12px auto 0' }}></div>
          </div>

          <form onSubmit={handleTrack} className="track-form">
            <input className="form-input" placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? '...' : 'Track'}</button>
          </form>

          {order && (
            <div className="track-result card">
              <div className="track-info-header">
                <div>
                  <p className="order-id">Order #{order._id?.slice(-8).toUpperCase()}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="order-total">PKR {order.total_amount?.toLocaleString()}</p>
              </div>

              {/* Progress Steps */}
              <div className="track-progress">
                <div className="track-bar">
                  <div className="track-bar-fill" style={{ width: `${Math.max(0, currentStep) / (steps.length - 1) * 100}%` }}></div>
                </div>
                {steps.map((step, i) => (
                  <div key={step} className={`track-step ${i <= currentStep ? 'active' : ''}`}>
                    <div className="track-dot">{i <= currentStep ? '✓' : i + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {order.tracking_number && (
                <p className="tracking-number">Tracking #: <strong>{order.tracking_number}</strong></p>
              )}

              <div className="track-items">
                {order.items?.map((item, i) => (
                  <div key={i} className="track-item">
                    <div className="track-item-img">
                      <img src={imgSrc(item.image)} alt="" />
                    </div>
                    <span className="track-item-name">{item.name}</span>
                    <span className="track-item-qty">×{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
