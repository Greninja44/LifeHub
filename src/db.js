// src/db.js
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lifehub';

const connectDB = async () => {
  try {
    // Modern mongoose (v6+) no longer requires useNewUrlParser/useUnifiedTopology
  await mongoose.connect(MONGODB_URI);
  // keep the original success message (check mark) for compatibility with logs
  console.log('✅ MongoDB connected:', MONGODB_URI);
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }
};

module.exports = connectDB;

