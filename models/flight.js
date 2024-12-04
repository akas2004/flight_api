const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  departureDate: { type: Date, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  companyName: { type: String, required: true },
  priceInINR: { type: Number, required: true },
});

module.exports = mongoose.model("Flight", flightSchema);
