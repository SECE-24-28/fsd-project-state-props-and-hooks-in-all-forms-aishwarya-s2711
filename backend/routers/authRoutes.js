const express = require('express');
const router = express.Router();
const { signup, login, getMe, updateProfile } = require('../controller/authController');
const { protect } = require('../utlis/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
