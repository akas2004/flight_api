const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// Create a new flight
router.post('/', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get flight by ID
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update flight
router.put('/:id', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete flight
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) return res.status(404).json({ error: 'Flight not found' });
    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
