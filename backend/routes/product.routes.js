const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getBestSelling,
  searchProducts,
  getCategories,
  getProductById,
  getByCategory,
  getFacets,
  getBuilderProducts,
} = require('../controllers/product.controller');

// Public product routes
router.get('/',                    getProducts);        // GET /api/products?category=cpu&search=ryzen
router.get('/featured',            getFeaturedProducts); // homepage featured
router.get('/bestselling',         getBestSelling);      // homepage best sellers
router.get('/search',              searchProducts);      // search suggestions
router.get('/categories',          getCategories);       // all categories
router.get('/facets',              getFacets);            // filter sidebar options
router.get('/builder',             getBuilderProducts);   // get products for PC builder
router.get('/category/:category',  getByCategory);       // filter by category
router.get('/:id',                 getProductById);      // single product

module.exports = router;
