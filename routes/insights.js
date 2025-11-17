const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Insight = require('../models/Insight');

const DEMO_USER = 'demo-user';

router.get('/', async (req, res) => {
  try {
    const items = await Insight.find({ userId: DEMO_USER }).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /api/insights', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, tags, mood } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'Text required' });
    const item = new Insight({ userId: DEMO_USER, text: text.trim(), tags: Array.isArray(tags) ? tags : (tags ? [tags] : []), mood: mood || '' });
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('POST /api/insights', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid id' });
    const item = await Insight.findOneAndDelete({ _id: id, userId: DEMO_USER });
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('DELETE /api/insights', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
