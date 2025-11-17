const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Budget = require('../models/Budget');

const DEMO_USER = 'demo-user';

router.get('/', async (req, res) => {
  try {
    const items = await Budget.find({ userId: DEMO_USER }).sort({ date: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /api/budgets', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || amount === undefined) return res.status(400).json({ success: false, error: 'Title and amount required' });
    const item = new Budget({ userId: DEMO_USER, title: title.trim(), amount: Number(amount), category: category || 'general', date: date ? new Date(date) : Date.now(), notes: notes || '' });
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('POST /api/budgets', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid id' });
    const item = await Budget.findOneAndDelete({ _id: id, userId: DEMO_USER });
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('DELETE /api/budgets', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
