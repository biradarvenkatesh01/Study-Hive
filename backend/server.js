// Load environment variables
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection function

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple test route
app.get('/', (req, res) => {
  res.send('Hello from the Study Hive Backend!');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Server ko chalu karein
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});