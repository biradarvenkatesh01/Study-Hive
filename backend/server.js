// Load environment variables from a .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in request bodies

// Define a simple test route
app.get('/', (req, res) => {
  res.send('Hello from the Study Hive Backend!');
});

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});