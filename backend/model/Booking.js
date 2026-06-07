const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package:       { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  travelers:     [{ name: String, age: Number, passport: String }],
  persons:       { type: Number, required: true, min: 1 },
  travelDate:    { type: Date, required: true },
  totalAmount:   { type: Number, required: true },
  status:        { type: String, enum: ['Pending','Confirmed','Cancelled','Completed'], default: 'Pending' },
  paymentStatus: { type: String, enum: ['Unpaid','Paid','Refunded'], default: 'Unpaid' },
  paymentId:     { type: String, default: '' },
  bookingId:     { type: String, unique: true },
  specialReq:    { type: String, default: '' },
}, { timestamps: true });

// Use async pre-save — no next() callback needed in Mongoose 7+
bookingSchema.pre('save', async function () {
  if (!this.bookingId) {
    this.bookingId = 'TG' + Date.now().toString().slice(-8);
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
