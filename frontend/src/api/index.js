import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const verifyEmail = (token) => API.get(`/auth/verify/${token}`);
export const resendVerification = (data) => API.post('/auth/resend-verification', data);
export const forgotPassword = (data) => API.post('/auth/forgot-password', data);
export const resetPassword = (token, data) => API.post(`/auth/reset-password/${token}`, data);
export const getMe = () => API.get('/auth/me');

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getFeaturedProducts = () => API.get('/products/featured');
export const getBestSelling = () => API.get('/products/bestselling');
export const searchProducts = (q) => API.get('/products/search', { params: { q } });
export const getCategories = () => API.get('/products/categories');
export const getProductFacets = (params) => API.get('/products/facets', { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const getByCategory = (cat, params) => API.get(`/products/category/${cat}`, { params });

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart/add', data);
export const updateCartItem = (itemId, data) => API.put(`/cart/update/${itemId}`, data);
export const removeCartItem = (itemId) => API.delete(`/cart/remove/${itemId}`);
export const clearCart = () => API.delete('/cart/clear');

// Orders
export const placeOrder = (data) => API.post('/orders/checkout', data);
export const getMyOrders = () => API.get('/orders/my-orders');
export const trackOrder = (id) => API.get(`/orders/track/${id}`);

// Reviews
export const submitReview      = (data)      => API.post('/reviews', data);
export const getProductReviews = (productId) => API.get(`/reviews/${productId}`);
export const getLatestReviews  = ()          => API.get('/reviews/latest');

// Wishlist (requires auth)
export const getWishlist          = ()          => API.get('/wishlist');
export const getWishlistIds       = ()          => API.get('/wishlist/ids');
export const addToWishlist        = (productId) => API.post(`/wishlist/${productId}`);
export const removeFromWishlist   = (productId) => API.delete(`/wishlist/${productId}`);
export const clearWishlist        = ()          => API.delete('/wishlist/clear');

// Admin
export const getDashboardStats = () => API.get('/admin/dashboard');
export const adminGetProducts = (params) => API.get('/admin/products', { params });
export const adminAddProduct = (data) => API.post('/admin/products', data);
export const adminUpdateProduct = (id, data) => API.put(`/admin/products/${id}`, data);
export const adminDeleteProduct = (id) => API.delete(`/admin/products/${id}`);
export const adminGetRecycleBin = () => API.get('/admin/recycle-bin');
export const adminRestoreProduct = (id) => API.put(`/admin/products/restore/${id}`);
export const adminPermanentDeleteProduct = (id) => API.delete(`/admin/products/permanent/${id}`);
export const adminBulkDeleteProducts = (ids) => API.post('/admin/products/bulk-delete', { ids });
export const adminBulkRestoreProducts = (ids) => API.post('/admin/products/bulk-restore', { ids });
export const adminEmptyRecycleBin = () => API.delete('/admin/recycle-bin/empty');
export const adminGetOrders = (params) => API.get('/admin/orders', { params });
export const adminUpdateOrder = (id, data) => API.put(`/admin/orders/${id}`, data);
export const adminGetUsers = (params) => API.get('/admin/users', { params });
export const adminUpdateUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const adminDeleteUser = (id) => API.delete(`/admin/users/${id}`);
export const adminGetReviews = (params) => API.get('/admin/reviews', { params });
export const adminUpdateReview = (id, data) => API.put(`/admin/reviews/${id}`, data);
export const adminDeleteReview = (id) => API.delete(`/admin/reviews/${id}`);
export const getCarouselSlides = () => API.get('/admin/carousel');
export const adminAddSlide = (data) => API.post('/admin/carousel', data);
export const adminAutoPriceSync = (category) => API.post(`/admin/products/auto-price-sync${category ? `?category=${category}` : ''}`);

// Contact Form
export const submitContactForm   = (data) => API.post('/contact', data);
export const adminGetMessages    = (params) => API.get('/contact', { params });
export const adminUpdateMessage  = (id, data) => API.put(`/contact/${id}`, data);
export const adminDeleteMessage  = (id) => API.delete(`/contact/${id}`);

// Payment
export const createStripeSession  = (data) => API.post('/payment/stripe/create-session', data);
export const verifyStripeSession  = (sessionId) => API.get(`/payment/stripe/verify/${sessionId}`);

// AI Chat
export const sendChatMessage = (message, sessionId) => API.post('/chat/web', { message, sessionId });
export const getBankDetails       = () => API.get('/payment/bank-details');

// PC Builder
export const getBuilderProducts = (params) => API.get('/products/builder', { params });

// Builds (save/share)
export const saveBuild = (data) => API.post('/builds', data);
export const getMyBuilds = () => API.get('/builds');
export const getBuildByShareId = (shareId) => API.get(`/builds/share/${shareId}`);
export const deleteBuild = (id) => API.delete(`/builds/${id}`);

export default API;
