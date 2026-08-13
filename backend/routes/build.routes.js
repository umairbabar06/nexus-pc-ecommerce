const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  saveBuild,
  getMyBuilds,
  getBuildByShareId,
  deleteBuild
} = require('../controllers/build.controller');

router.post('/', protect, saveBuild);
router.get('/', protect, getMyBuilds);
router.get('/share/:shareId', getBuildByShareId);
router.delete('/:id', protect, deleteBuild);

module.exports = router;
