require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const flightRoutes = require('./routes/flightRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes for the flights API
const flight_Routes = require('./routes/flightRoutes');
app.use('/api/flights', flight_Routes);

// Serve static files from the 'public' folder (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Connection Failed:', error));

// Routes
app.use('/api/flights', flightRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
