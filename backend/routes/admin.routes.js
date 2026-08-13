const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const admin = require('../controllers/admin.controller');

// All admin routes require login + admin role
router.use(protect, adminOnly);

// Dashboard
router.get('/dashboard', admin.getDashboardStats);

// Products CRUD
router.get('/products',               admin.getAllProducts);
router.post('/products',              admin.upload.single('image'), admin.addProduct);
router.put('/products/:id',           admin.upload.single('image'), admin.updateProduct);
router.delete('/products/:id',        admin.deleteProduct);

// Recycle bin
router.get('/recycle-bin',               admin.getRecycleBin);
router.delete('/recycle-bin/empty',      admin.emptyRecycleBin);
router.put('/products/restore/:id',      admin.restoreProduct);
router.delete('/products/permanent/:id', admin.permanentDelete);
router.post('/products/bulk-delete',     admin.bulkDeleteProducts);
router.post('/products/bulk-restore',    admin.bulkRestoreProducts);

// Orders
router.get('/orders',                  admin.getAllOrders);
router.put('/orders/:id',             admin.updateOrderStatus);

// Users
router.get('/users',                   admin.getAllUsers);
router.put('/users/:id',              admin.updateUser);
router.delete('/users/:id',           admin.deleteUser);

// Reviews
router.get('/reviews',                 admin.getAllReviews);
router.put('/reviews/:id',            admin.updateReviewStatus);
router.delete('/reviews/:id',         admin.deleteReview);

// Carousel
router.get('/carousel',               admin.getCarouselSlides);
router.post('/carousel',              admin.upload.single('image'), admin.addCarouselSlide);
router.put('/carousel/:id',           admin.upload.single('image'), admin.updateCarouselSlide);
router.delete('/carousel/:id',        admin.deleteCarouselSlide);

// Inventory
router.put('/inventory/:id',          admin.updateStock);
router.get('/inventory/low-stock',    admin.getLowStock);

// Auto Price Sync (AI-powered)
router.post('/products/auto-price-sync', admin.autoPriceSync);

module.exports = router;
