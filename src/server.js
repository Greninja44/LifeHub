// src/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./db');
const tasksRouter = require('../routes/tasks');
const studyPlansRouter = require('../routes/studyplans');
const budgetsRouter = require('../routes/budgets');
const insightsRouter = require('../routes/insights');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MongoDB Connection ---
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- API Routes ---
app.use('/api/tasks', tasksRouter);
app.use('/api/studyplans', studyPlansRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/insights', insightsRouter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});

// Note: removed catch-all route because some router/path-to-regexp versions
// throw on wildcard route patterns. Static files are served from /public
// and the root index is available at '/'. If you later need SPA fallback
// behavior, add a careful route that excludes API paths.

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 LifeHub server running at http://localhost:${PORT}`);
});
