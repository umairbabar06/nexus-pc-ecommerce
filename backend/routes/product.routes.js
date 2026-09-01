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
router.post('/batch-update-images', async (req, res) => {
  try {
    const Product = require('../models/Product');
    const mapping = req.body; // { "old.jpg": "https://res.cloudinary.com/..." }
    let count = 0;
    for (const [oldName, newUrl] of Object.entries(mapping)) {
      await Product.updateMany({ image: oldName }, { $set: { image: newUrl } });
      count++;
    }
    const CarouselSlide = require('../models/CarouselSlide');
    for (const [oldName, newUrl] of Object.entries(mapping)) {
      await CarouselSlide.updateMany({ image: oldName }, { $set: { image: newUrl } });
    }
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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
