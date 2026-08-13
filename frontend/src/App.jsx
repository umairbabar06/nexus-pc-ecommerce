import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import CustomerService from './pages/CustomerService';
import WhatsAppChat from './pages/WhatsAppChat';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import PcBuilder from './pages/PcBuilder';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
        <ErrorBoundary>
        <Router>
          <Toaster position="bottom-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/"                          element={<Home />} />
            <Route path="/login"                     element={<Login />} />
            <Route path="/signup"                    element={<Signup />} />
            <Route path="/verify/:token"             element={<VerifyEmail />} />
            <Route path="/forgot-password"           element={<ForgotPassword />} />
            <Route path="/reset-password/:token"     element={<ResetPassword />} />
            <Route path="/products"                  element={<Products />} />
            <Route path="/products/:id"              element={<ProductDetail />} />
            <Route path="/cart"                      element={<Cart />} />
            <Route path="/checkout"                  element={<Checkout />} />
            <Route path="/wishlist"                  element={<Wishlist />} />
            <Route path="/account"                   element={<Account />} />
            <Route path="/track-order"               element={<TrackOrder />} />
            <Route path="/about"                     element={<About />} />
            <Route path="/payment/success"             element={<PaymentSuccess />} />
            <Route path="/payment/cancel"              element={<PaymentCancel />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminPrivateRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders"   element={<AdminOrders />} />
              <Route path="users"    element={<AdminUsers />} />
              <Route path="reviews"  element={<AdminReviews />} />
            </Route>

            {/* Contact & Customer Service */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/whatsapp" element={<WhatsAppChat />} />

            {/* PC Builder */}
            <Route path="/pc-builder" element={<PcBuilder />} />
            <Route path="/pc-builder/:platform" element={<PcBuilder />} />
            <Route path="/pc-builder/:platform/share/:shareId" element={<PcBuilder />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        </ErrorBoundary>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
