const Build = require('../models/Build');

// @route   POST /api/builds
// @desc    Create or update a PC build
exports.saveBuild = async (req, res) => {
  try {
    const { _id, name, components, totalPrice, estimatedWattage, compatibilityStatus } = req.body;

    if (!components || Object.keys(components).length === 0) {
      return res.status(400).json({ success: false, message: 'At least one component is required.' });
    }

    if (_id) {
      // Update existing
      const build = await Build.findOneAndUpdate(
        { _id, user: req.user.id },
        { name, components, totalPrice, estimatedWattage, compatibilityStatus },
        { new: true }
      );
      if (!build) {
        return res.status(404).json({ success: false, message: 'Build not found or unauthorized.' });
      }
      return res.json({ success: true, build });
    } else {
      // Create new
      const build = new Build({
        user: req.user ? req.user.id : null,
        name,
        components,
        totalPrice,
        estimatedWattage,
        compatibilityStatus
      });
      await build.save();
      return res.status(201).json({ success: true, build });
    }
  } catch (err) {
    console.error('Save build error:', err);
    res.status(500).json({ success: false, message: 'Failed to save build.' });
  }
};

// @route   GET /api/builds
// @desc    Get all builds for logged-in user
exports.getMyBuilds = async (req, res) => {
  try {
    const builds = await Build.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json({ success: true, builds });
  } catch (err) {
    console.error('Get my builds error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch builds.' });
  }
};

// @route   GET /api/builds/share/:shareId
// @desc    Get a build by share ID (public)
exports.getBuildByShareId = async (req, res) => {
  try {
    const build = await Build.findOne({ shareId: req.params.shareId })
      .populate('components.cpu.product')
      .populate('components.mobo.product')
      .populate('components.ram.product')
      .populate('components.gpu.product')
      .populate('components.ssd.product')
      .populate('components.hdd.product')
      .populate('components.psu.product')
      .populate('components.casing.product')
      .populate('components.cooler.product');

    if (!build) {
      return res.status(404).json({ success: false, message: 'Build not found.' });
    }
    res.json({ success: true, build });
  } catch (err) {
    console.error('Get shared build error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch shared build.' });
  }
};

// @route   DELETE /api/builds/:id
// @desc    Delete a build
exports.deleteBuild = async (req, res) => {
  try {
    const build = await Build.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!build) {
      return res.status(404).json({ success: false, message: 'Build not found or unauthorized.' });
    }
    res.json({ success: true, message: 'Build deleted.' });
  } catch (err) {
    console.error('Delete build error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete build.' });
  }
};
