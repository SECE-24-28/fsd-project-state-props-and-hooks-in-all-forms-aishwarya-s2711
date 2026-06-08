const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getAllBookings, updateBookingStatus } = require('../controller/packageController');
const { protect, onlyAdmin } = require('../utlis/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/user', protect, getMyBookings); // align with frontend /bookings/user call
router.get('/all', protect, onlyAdmin, getAllBookings);
router.put('/:id/status', protect, onlyAdmin, updateBookingStatus);

module.exports = router;
