const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * protect — verifies JWT token, attaches user to req
 * Replaces PHP session_start() + $_SESSION['user_id'] checks
 */
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired.' });
  }
};

/**
 * adminOnly — allows access only to admin users
 * Replaces PHP admin session checks in Admin/*.php files
 */
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.user_role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }
};
