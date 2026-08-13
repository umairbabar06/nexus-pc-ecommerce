import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AdminNav from '../../components/AdminNav';
import { adminGetUsers, adminUpdateUser, adminDeleteUser } from '../../api';
import toast from 'react-hot-toast';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      const res = await adminGetUsers(params);
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setTotal(res.data.total || 0);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleRoleToggle = async (user) => {
    const newRole = user.user_role === 'admin' ? 'user' : 'admin';
    setUpdating(true);
    try {
      await adminUpdateUser(user._id, { user_role: newRole });
      toast.success(`${user.name} is now ${newRole}`);
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, user_role: newRole } : u));
    } catch {
      toast.error('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await adminDeleteUser(userId);
      toast.success('User deleted');
      setUsers(prev => prev.filter(u => u._id !== userId));
      setConfirmDelete(null);
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <div className="section-header">
            <h2>Manage Users</h2>
            <p>{total} registered users</p>
            <div className="section-divider"></div>
          </div>

          <AdminNav />

          {/* ── Search ── */}
          <div className="au-filters">
            <form className="au-search-form" onSubmit={handleSearch}>
              <input
                className="form-input"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>

          {/* ── Table ── */}
          {loading ? (
            <div className="spinner-container"><div className="spinner"></div></div>
          ) : users.length === 0 ? (
            <div className="empty-state"><p>No users found.</p></div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="admin-table-wrap card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Verified</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td className="au-user-name">{user.name}</td>
                        <td className="au-user-email">{user.email}</td>
                        <td>
                          <span className={`badge ${user.user_role === 'admin' ? 'badge-success' : ''}`}>
                            {user.user_role}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${user.is_verified ? 'badge-success' : 'badge-danger'}`}>
                            {user.is_verified ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="order-date-cell">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="au-actions">
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => handleRoleToggle(user)}
                              disabled={updating}
                            >
                              {user.user_role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                            </button>
                            <button
                              className="btn btn-sm au-delete-btn"
                              onClick={() => setConfirmDelete(user)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="au-mobile-list">
                {users.map(user => (
                  <div key={user._id} className="au-mobile-card card">
                    <div className="au-mobile-row">
                      <div>
                        <p className="au-user-name">{user.name}</p>
                        <p className="au-user-email">{user.email}</p>
                      </div>
                      <div className="au-mobile-badges">
                        <span className={`badge ${user.user_role === 'admin' ? 'badge-success' : ''}`}>
                          {user.user_role}
                        </span>
                        <span className={`badge ${user.is_verified ? 'badge-success' : 'badge-danger'}`}>
                          {user.is_verified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                    <p className="au-joined">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                    <div className="au-mobile-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleRoleToggle(user)}
                        disabled={updating}
                      >
                        {user.user_role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                      </button>
                      <button
                        className="btn btn-sm au-delete-btn"
                        onClick={() => setConfirmDelete(user)}
                      >
                        Delete
                      </button>
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

      {/* ── Delete Confirm Modal ── */}
      {confirmDelete && (
        <div className="ao-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="au-confirm-modal card" onClick={e => e.stopPropagation()}>
            <h3>Delete User</h3>
            <p>Are you sure you want to permanently delete <strong>{confirmDelete.name}</strong>? This cannot be undone.</p>
            <div className="au-confirm-actions">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete._id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
