const { verifyToken } = require('../utlis/jwt');
const User = require('../model/User');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (!['admin', 'agent'].includes(req.user?.role)) return res.status(403).json({ message: 'Admin access required' });
  next();
};

module.exports = { protect, adminOnly };
