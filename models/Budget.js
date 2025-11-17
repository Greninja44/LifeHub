const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, default: 'demo-user' },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  category: { type: String, default: 'general', trim: true },
  date: { type: Date, default: Date.now },
  notes: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', BudgetSchema);
