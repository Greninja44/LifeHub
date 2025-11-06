// src/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MongoDB Connection ---
mongoose.connect('mongodb://127.0.0.1:27017/lifehub')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection error:', err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});

// --- Serve index file ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 LifeHub server running at http://localhost:${PORT}`);
});
