// src/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const tasksRouter = require('../routes/tasks');
const connectDB = require('./db');


const app = express();
const PORT = process.env.PORT || 3000;

// --- MongoDB Connection ---
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

// Serve static frontend assets from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});

// --- Serve index file ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// --- Start Server ---
const server = app.listen(PORT, () => {
  console.log(`🚀 LifeHub server running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  server.close(async () => {
    console.log('HTTP server closed');
    try {
      const mongoose = require('mongoose');
      await mongoose.connection.close(false);
      console.log('MongoDB connection closed');
    } catch (err) {
      console.error('Error closing MongoDB connection', err);
    }
    process.exit(0);
  });
});
