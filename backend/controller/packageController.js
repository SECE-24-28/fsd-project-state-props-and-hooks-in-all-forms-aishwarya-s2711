const Package = require('../model/Package');
const Booking = require('../model/Booking');
const mongoose = require('mongoose');

// ── Packages ──────────────────────────────────────────────────────────────────

exports.getPackages = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, search, sort, page = 1, limit = 9 } = req.query;
    const filter = { isActive: true };

    if (type)   filter.type = type;
    if (search) filter.$or  = [
      { title:       { $regex: search, $options: 'i' } },
      { destination: { $regex: search, $options: 'i' } },
    ];
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortObj = sort === 'price_asc'  ? { price: 1 }
                  : sort === 'price_desc' ? { price: -1 }
                  : sort === 'rating'     ? { rating: -1 }
                  :                        { createdAt: -1 };

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Package.countDocuments(filter);
    const packages = await Package.find(filter).sort(sortObj).skip(skip).limit(Number(limit));

    res.json({ packages, total, pages: Math.ceil(total / Number(limit)), page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    // Support both MongoDB ObjectId and numeric id (for seeded data)
    const { id } = req.params;
    let pkg = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      pkg = await Package.findById(id);
    }
    // Also allow numeric id field if stored
    if (!pkg) {
      pkg = await Package.findOne({ $or: [{ _id: mongoose.Types.ObjectId.isValid(id) ? id : null }, { numericId: Number(id) }] });
    }

    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: 'Invalid package id' });
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: 'Invalid package id' });
    await Package.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Bookings ──────────────────────────────────────────────────────────────────

exports.createBooking = async (req, res) => {
  try {
    const { packageId, persons, travelDate, totalAmount, specialReq } = req.body;

    if (!packageId || !persons || !travelDate || !totalAmount)
      return res.status(400).json({ message: 'packageId, persons, travelDate and totalAmount are required' });

    if (!mongoose.Types.ObjectId.isValid(packageId))
      return res.status(400).json({ message: 'Invalid packageId' });

    const booking = await Booking.create({
      user:        req.user._id,
      package:     packageId,
      persons:     Number(persons),
      travelDate:  new Date(travelDate),
      totalAmount: Number(totalAmount),
      specialReq:  specialReq || '',
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking
      .find({ user: req.user._id })
      .populate('package', 'title image destination duration price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking
      .find()
      .populate('user',    'name email phone')
      .populate('package', 'title destination price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: 'Invalid booking id' });
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
