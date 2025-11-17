const mongoose = require('mongoose');

const StudyPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: 'demo-user' },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  sessions: { type: Number, default: 0 },
  progress: { type: Number, default: 0 }, // 0-100
  dueDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyPlan', StudyPlanSchema);
