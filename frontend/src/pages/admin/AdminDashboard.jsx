import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AdminNav from '../../components/AdminNav';
import { getDashboardStats } from '../../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(res => {
        setStats(res.data.stats);
        setRecentOrders(res.data.recentOrders || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-wrapper"><Navbar /><div className="spinner-container"><div className="spinner"></div></div></div>;

  const statCards = [
    { label: 'Products', value: stats?.totalProducts || 0, icon: '📦' },
    { label: 'Orders', value: stats?.totalOrders || 0, icon: '🛒' },
    { label: 'Users', value: stats?.totalUsers || 0, icon: '👥' },
    { label: 'Revenue', value: `PKR ${(stats?.totalRevenue || 0).toLocaleString()}`, icon: '💰' },
    { label: 'Pending', value: stats?.pendingOrders || 0, icon: '⏳' },
  ];

  const statusColor = (s) => {
    if (s === 'Delivered') return 'badge-success';
    if (s === 'Cancelled') return 'badge-danger';
    return 'badge-warning';
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Admin Dashboard</h2>
            <p>Overview of your store</p>
            <div className="section-divider"></div>
          </div>

          <AdminNav />

          <div className="admin-stats-grid">
            {statCards.map((s, i) => (
              <div key={i} className="admin-stat-card card">
                <div className="stat-header">
                  <span className="stat-card-label">{s.label}</span>
                  <span className="stat-card-icon">{s.icon}</span>
                </div>
                <p className="stat-card-value">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="section-header">
            <h2>Recent Orders</h2>
            <div className="section-divider"></div>
          </div>

          {recentOrders.length === 0 ? (
            <div className="empty-state"><p>No orders yet</p></div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="admin-table-wrap card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order._id}>
                        <td className="order-id-cell">#{order._id?.slice(-8).toUpperCase()}</td>
                        <td>{order.customer_name}</td>
                        <td className="order-amount">PKR {order.total_amount?.toLocaleString()}</td>
                        <td><span className={`badge ${statusColor(order.order_status)}`}>{order.order_status}</span></td>
                        <td className="order-date-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="admin-orders-mobile">
                {recentOrders.map(order => (
                  <div key={order._id} className="admin-order-mobile card">
                    <div className="mobile-order-row">
                      <span className="order-id-cell">#{order._id?.slice(-8).toUpperCase()}</span>
                      <span className={`badge ${statusColor(order.order_status)}`}>{order.order_status}</span>
                    </div>
                    <p className="mobile-order-customer">{order.customer_name}</p>
                    <div className="mobile-order-row">
                      <span className="order-amount">PKR {order.total_amount?.toLocaleString()}</span>
                      <span className="order-date-cell">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
