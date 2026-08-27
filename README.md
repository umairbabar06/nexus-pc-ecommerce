# NEXUS PC — Premium PC Components E-Commerce

Full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React 19, Node.js) for selling PC components. Features an AI-powered assistant, a custom PC builder with real-time hardware compatibility checking, and a full admin panel.

🔗 **Live Demo:** [nexus-pc-beta.vercel.app](https://nexus-pc-beta.vercel.app)

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Features

### 🛒 Core E-Commerce
- Product catalog with multi-faceted filtering (category, brand, socket, RAM type, VRAM, price range)
- Shopping cart with context-based state management
- Wishlist functionality
- Multi-step checkout supporting **Stripe**, **JazzCash**, **EasyPaisa**, and **Bank Transfer**
- Order tracking by Order ID and email
- Product reviews with 5-star ratings

### 🤖 AI Integration
- **Jarvis AI Assistant** — Real-time chat powered by Gemini 2.0 Flash with Google Search grounding
- **WhatsApp Bot** — Twilio-powered auto-responses using Gemini AI

### 🖥️ Custom PC Builder
- Intel and AMD build paths
- Real-time hardware compatibility checks:
  - CPU socket ↔ Motherboard matching
  - DDR4/DDR5 RAM compatibility
  - Case form factor fitting
  - Power supply wattage estimation
- Shareable build URLs with 8-character unique IDs
- Add entire build to cart in one click

### 👨‍💼 Admin Panel
- Dashboard with revenue, orders, and user statistics
- Full product CRUD with image upload, specs management, and bulk operations
- Soft-delete recycle bin with restore capability
- Order management with status tracking and payment sync
- User role management (admin/user)
- Review moderation (approve/reject/pending)
- Carousel/banner management

### 🔒 Security
- JWT authentication with email verification and password reset
- Passwords hashed with bcrypt
- Helmet (secure HTTP headers)
- express-mongo-sanitize (NoSQL injection prevention)
- xss-clean (cross-site scripting prevention)
- hpp (HTTP parameter pollution prevention)
- express-rate-limit (brute-force protection)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router v7 |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT + bcryptjs |
| Payments | Stripe, JazzCash, EasyPaisa |
| AI | Google Gemini 2.0 Flash (@google/genai) |
| Messaging | Twilio (WhatsApp) |
| Email | Nodemailer (Gmail SMTP) |
| File Upload | Multer |
| Styling | Vanilla CSS with CSS custom properties |

---

## Project Structure

```
nexus-mern-backup/
├── backend/
│   ├── config/          # Database, filter configs, PC builder compatibility
│   ├── controllers/     # Route handlers (auth, products, orders, admin, chat, builds)
│   ├── middleware/       # JWT auth, rate limiter
│   ├── models/           # Mongoose schemas (User, Product, Order, Review, Build, etc.)
│   ├── routes/           # Express route definitions
│   ├── scripts/          # Migration & utility scripts
│   ├── tests/            # Jest unit tests
│   ├── uploads/          # Product images
│   └── server.js         # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios API client
│   │   ├── components/   # Reusable components (Navbar, Footer, SEO, ErrorBoundary)
│   │   ├── context/      # React context (Auth, Cart, Wishlist)
│   │   ├── pages/        # Page components
│   │   │   └── admin/    # Admin panel pages
│   │   ├── utils/        # PC builder compatibility engine
│   │   ├── App.jsx       # Route definitions
│   │   └── index.css     # Design system & global styles
│   └── index.html
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/umairbabar06/nexus-pc.git
cd nexus-pc
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (see `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexuspc
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Create Admin Account
```bash
cd backend
node scripts/makeAdmin.js your_email@gmail.com
```

---

## Running Tests

```bash
cd backend
npm test
```

Tests cover:
- User model validation (required fields, default values, roles)
- Product model validation (categories, specs, pricing)
- Order model validation (statuses, payment methods, guest orders)
- Build model validation (components, compatibility status)
- JWT token creation, verification, and expiry
- Middleware logic

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/verify/:token` | Verify email address |
| POST | `/api/auth/forgot-password` | Request password reset |
| PUT | `/api/auth/reset-password/:token` | Reset password |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (with filters, search, pagination) |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/categories` | Get all categories |
| GET | `/api/products/builder` | Get products for PC builder |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create an order |
| GET | `/api/orders/my` | Get logged-in user's orders |
| GET | `/api/orders/track` | Track order by ID + email |

### Cart & Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/add` | Add item to cart |
| DELETE | `/api/cart/:id` | Remove item from cart |
| GET | `/api/wishlist` | Get wishlist |
| POST | `/api/wishlist/toggle` | Toggle wishlist item |

### PC Builder
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/builds` | Save a build |
| GET | `/api/builds` | Get user's builds |
| GET | `/api/builds/share/:shareId` | Get shared build |
| DELETE | `/api/builds/:id` | Delete a build |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard statistics |
| GET | `/api/admin/products` | All products (with deleted) |
| POST | `/api/admin/products` | Add product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Soft delete product |
| GET | `/api/admin/orders` | All orders (searchable) |
| PUT | `/api/admin/orders/:id` | Update order status |
| GET | `/api/admin/users` | All users |
| POST | `/api/admin/products/auto-price-sync` | AI price sync |

### AI Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to Jarvis AI |
| GET | `/api/chat/sessions` | Get chat history |

---

## Environment Variables

See `backend/.env.example` for a complete list of required environment variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret for JWT signing |
| `CLIENT_URL` | ✅ | Frontend URL for CORS |
| `GEMINI_API_KEY` | ⚡ | Required for Jarvis AI & price sync |
| `STRIPE_SECRET_KEY` | 💳 | Required for Stripe payments |
| `EMAIL_USER` / `EMAIL_PASS` | 📧 | Required for email verification |

---

## License

This project is licensed under the MIT License.
