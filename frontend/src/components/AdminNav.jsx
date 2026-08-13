import { NavLink } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = () => {
  return (
    <div className="admin-nav-wrap">
      <nav className="admin-nav">
        <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
          Products
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
          Orders
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
          Users
        </NavLink>
        <NavLink to="/admin/reviews" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
          Reviews
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminNav;
