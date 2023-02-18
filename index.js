if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Import required modules
const express = require('express');
const server = require('./server');
const db = require('./db');

// Initialize the app
const app = express();

// Connect to the database
db.connect();

// Configure the app
server.configure(app);

// Start the server
server.start(app);

