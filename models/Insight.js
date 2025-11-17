const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: 'demo-user' },
  text: { type: String, required: true, trim: true },
  tags: { type: [String], default: [] },
  mood: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insight', InsightSchema);
