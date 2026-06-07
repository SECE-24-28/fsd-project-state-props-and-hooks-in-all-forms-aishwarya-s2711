const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  destination:  { type: String, required: true },
  type:         { type: String, enum: ['Domestic','International','Honeymoon','Family','Group','Adventure'], required: true },
  price:        { type: Number, required: true },
  originalPrice:{ type: Number },
  duration:     { type: String, required: true },
  rating:       { type: Number, default: 0 },
  reviews:      { type: Number, default: 0 },
  image:        { type: String },
  images:       [{ type: String }],
  badge:        { type: String },
  seats:        { type: Number, default: 20 },
  highlights:   [{ type: String }],
  inclusions:   [{ type: String }],
  exclusions:   [{ type: String }],
  itinerary:    [{ day: Number, title: String, desc: String }],
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
