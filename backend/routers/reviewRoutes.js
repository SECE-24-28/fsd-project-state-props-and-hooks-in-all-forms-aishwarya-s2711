const express = require('express');
const router  = express.Router();
const { protect } = require('../utlis/authMiddleware');
const { Review } = require('../model/Blog');

// GET /api/reviews/user — user: get reviews submitted by logged-in user
router.get('/user', protect, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('package', 'title')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
