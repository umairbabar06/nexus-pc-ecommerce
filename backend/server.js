const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.set('trust proxy', 1); // Required for Render/Heroku deployments behind a proxy
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Stripe webhook MUST receive raw body (before express.json)
app.use('/api/payment/stripe/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Security Middleware ──────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: false, // allows serving images to frontend
}));
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss());           // Prevent XSS attacks
app.use(hpp());           // Prevent HTTP Param Pollution

// Serve uploaded product images statically (replaces Admin/upload/)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const { apiLimiter } = require('./middleware/rateLimiter');
app.use('/api/', apiLimiter);

// ─── API Routes ───────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth.routes'));
app.use('/api/products',  require('./routes/product.routes'));
app.use('/api/cart',      require('./routes/cart.routes'));
app.use('/api/orders',    require('./routes/order.routes'));
app.use('/api/admin',     require('./routes/admin.routes'));
app.use('/api/reviews',   require('./routes/review.routes'));
app.use('/api/wishlist',  require('./routes/wishlist.routes'));
app.use('/api/builds',    require('./routes/build.routes'));
app.use('/api/contact',   require('./routes/contact.routes'));
app.use('/api/payment',   require('./routes/payment.routes'));
app.use('/api/chat',      require('./routes/chat.routes'));

// ─── Health Check ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🚀 Nexus PC API is running!' });
});

// ─── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
