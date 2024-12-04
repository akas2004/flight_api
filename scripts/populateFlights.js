require('dotenv').config();  // Load environment variables
const mongoose = require('mongoose');
const Flight = require('../models/flight');  // Adjust path as needed

// Arrays with predefined origin, destination, and airline companies
const origins = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Patna', 'Hyderabad', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Bhopal', 'Nagpur'];
const destinations = ['London', 'Dubai', 'New York', 'Singapore', 'Paris', 'Sydney', 'Munich', 'Berlin', 'Tokyo', 'Osaka', 'Beijing', 'Doha', 'Amsterdam'];
const companies = ['Air India','Jet Airways', 'Qantas', 'Air India Express', 'Indigo', 'Vistara Express', 'SpiceJet Express', 'GoAir Express', 'Air Asia Express', 'Jet Airways Express', 'Qantas Express'];

// Function to generate random flight data
const generateRandomFlight = () => ({
  flightNumber: `AI${Math.floor(1000 + Math.random() * 9000)}`,  // Generate a random flight number
  departureDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),  // Random date in the next 30 days
  origin: origins[Math.floor(Math.random() * origins.length)],  // Random origin from the list
  destination: destinations[Math.floor(Math.random() * destinations.length)],  // Random destination from the list
  availableSeats: Math.floor(50 + Math.random() * 200),  // Between 50 to 250 available seats
  companyName: companies[Math.floor(Math.random() * companies.length)],  // Random company from the list
  priceInINR: Math.floor(2000 + Math.random() * 10000),  // Random price between ₹2000 to ₹12000
});

// Function to populate flight data into MongoDB
const populateData = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');

    // Generate an array of 50 random flights
    const flights = Array.from({ length: 50 }, generateRandomFlight);

    // Insert the generated flights into the database
    await Flight.insertMany(flights);
    console.log('Flight data populated successfully');
  } catch (error) {
    console.error('Error populating data:', error);
  } finally {
    // Disconnect from the database after the operation
    mongoose.disconnect();
  }
};

// Run the populateData function to insert the data
populateData();
