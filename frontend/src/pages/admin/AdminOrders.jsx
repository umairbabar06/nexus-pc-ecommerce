import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AdminNav from '../../components/AdminNav';
import { adminGetOrders, adminUpdateOrder } from '../../api';
import toast from 'react-hot-toast';
import './AdminOrders.css';

const STATUS_OPTIONS = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

const statusColor = (s) => {
  if (s === 'Delivered') return 'badge-success';
  if (s === 'Cancelled') return 'badge-danger';
  if (s === 'Shipped') return 'badge-warning';
  return 'badge';
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (filterStatus) params.status = filterStatus;
      if (search) params.search = search;
      const res = await adminGetOrders(params);
      setOrders(res.data.orders || []);
      setTotalPages(res.data.totalPages || 1);
      setTotal(res.data.total || 0);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [page, filterStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      await adminUpdateOrder(orderId, { order_status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, order_status: newStatus } : o));
      if (selectedOrder?._id === orderId) setSelectedOrder(prev => ({ ...prev, order_status: newStatus }));
    } catch {
      toast.error('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Manage Orders</h2>
            <p>{total} total orders</p>
            <div className="section-divider"></div>
          </div>

          <AdminNav />

          {/* ── Filters ── */}
          <div className="ao-filters">
            <form className="ao-search-form" onSubmit={handleSearch}>
              <input
                className="form-input"
                placeholder="Search by customer name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <select
              className="form-input ao-status-filter"
              value={filterStatus}
              onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* ── Table ── */}
          {loading ? (
            <div className="spinner-container"><div className="spinner"></div></div>
          ) : orders.length === 0 ? (
            <div className="empty-state"><p>No orders found.</p></div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="admin-table-wrap card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td className="order-id-cell">#{order._id?.slice(-8).toUpperCase()}</td>
                        <td>
                          <p className="ao-customer-name">{order.customer_name}</p>
                          <p className="ao-customer-email">{order.customer_email}</p>
                        </td>
                        <td className="ao-items-count">{order.items?.length || 0} item(s)</td>
                        <td className="order-amount">PKR {order.total_amount?.toLocaleString()}</td>
                        <td><span className={`badge ${statusColor(order.order_status)}`}>{order.order_status}</span></td>
                        <td className="order-date-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="ao-actions">
                            <button className="btn btn-outline btn-sm" onClick={() => setSelectedOrder(order)}>Details</button>
                            <select
                              className="ao-status-select"
                              value={order.order_status}
                              onChange={e => handleStatusUpdate(order._id, e.target.value)}
                              disabled={updating}
                            >
                              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="admin-orders-mobile">
                {orders.map(order => (
                  <div key={order._id} className="ao-mobile-card card">
                    <div className="mobile-order-row">
                      <span className="order-id-cell">#{order._id?.slice(-8).toUpperCase()}</span>
                      <span className={`badge ${statusColor(order.order_status)}`}>{order.order_status}</span>
                    </div>
                    <p className="ao-customer-name">{order.customer_name}</p>
                    <p className="ao-customer-email">{order.customer_email}</p>
                    <div className="mobile-order-row" style={{ marginTop: '10px' }}>
                      <span className="order-amount">PKR {order.total_amount?.toLocaleString()}</span>
                      <span className="order-date-cell">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="ao-mobile-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => setSelectedOrder(order)}>Details</button>
                      <select
                        className="ao-status-select"
                        value={order.order_status}
                        onChange={e => handleStatusUpdate(order._id, e.target.value)}
                        disabled={updating}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Order Detail Modal ── */}
      {selectedOrder && (
        <div className="ao-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="ao-modal card" onClick={e => e.stopPropagation()}>
            <div className="ao-modal-header">
              <div>
                <h3>Order #{selectedOrder._id?.slice(-8).toUpperCase()}</h3>
                <p className="ao-modal-date">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button className="ao-modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="ao-modal-body">
              <div className="ao-modal-section">
                <h4>Customer</h4>
                <p><strong>{selectedOrder.customer_name}</strong></p>
                <p>{selectedOrder.customer_email}</p>
                <p>{selectedOrder.customer_address}</p>
              </div>
              <div className="ao-modal-section">
                <h4>Payment</h4>
                <p>{selectedOrder.payment_method?.toUpperCase() || 'COD'}</p>
                <span className={`badge ${statusColor(selectedOrder.order_status)}`}>{selectedOrder.order_status}</span>
              </div>
            </div>

            <div className="ao-modal-items">
              <h4>Items</h4>
              {selectedOrder.items?.map((item, i) => (
                <div key={i} className="ao-modal-item">
                  <span className="ao-modal-item-name">{item.name}</span>
                  <span className="ao-modal-item-qty">×{item.quantity}</span>
                  <span className="ao-modal-item-price">PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="ao-modal-total">
                <span>Total</span>
                <span>PKR {selectedOrder.total_amount?.toLocaleString()}</span>
              </div>
            </div>

            <div className="ao-modal-footer">
              <label className="form-label">Update Status</label>
              <div className="ao-modal-update">
                <select
                  className="form-input"
                  value={selectedOrder.order_status}
                  onChange={e => handleStatusUpdate(selectedOrder._id, e.target.value)}
                  disabled={updating}
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
