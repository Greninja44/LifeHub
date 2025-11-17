// src/db.js
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lifehub';

const connectDB = async () => {
  try {
    console.log('Using MONGODB_URI:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      // current mongoose driver no longer requires these options
    });
    console.log('MongoDB connected:', MONGODB_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    console.warn('Continuing without DB connection. The server will run in degraded mode until MongoDB is available.');
    // Do not exit the process; allow the app to run for development when Mongo is not available.
  }
};

module.exports = connectDB;

