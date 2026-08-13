import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../api';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';
import './Account.css';

const Account = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!user) return (
    <div className="page-wrapper">
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Not Logged In</h1>
          <p className="auth-subtitle">Please login to view your account.</p>
          <Link to="/login" className="btn btn-primary btn-block">Login</Link>
        </div>
      </div>
    </div>
  );

  const statusColor = (s) => {
    if (s === 'Delivered') return 'badge-success';
    if (s === 'Cancelled' || s === 'Failed') return 'badge-danger';
    return 'badge-warning';
  };
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          {/* Profile Card */}
          <div className="account-profile card">
            <div className="profile-info">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email">{user.email}</p>
              <span className="badge">{user.user_role?.toUpperCase()}</span>
            </div>
            <button onClick={logout} className="btn btn-outline btn-sm">Logout</button>
          </div>

          {/* Orders */}
          <div className="section-header">
            <h2>My Orders</h2>
            <p>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
            <div className="section-divider"></div>
          </div>

          {loading ? (
            <div className="spinner-container"><div className="spinner"></div></div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <p>No orders yet</p>
              <Link to="/products" className="btn btn-outline" style={{ marginTop: '16px' }}>Start Shopping</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card card">
                  <div className="order-header">
                    <div>
                      <p className="order-id">Order #{order._id?.slice(-8).toUpperCase()}</p>
                      <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="order-meta">
                      <span className={`badge ${statusColor(order.order_status)}`}>{order.order_status}</span>
                      <span className="order-total">PKR {order.total_amount?.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="order-thumbs">
                    {order.items?.map((item, i) => (
                      <div key={i} className="order-thumb">
                        <img src={getImageUrl(item.image)} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
