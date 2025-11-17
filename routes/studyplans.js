const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StudyPlan = require('../models/StudyPlan');

const DEMO_USER = 'demo-user';

router.get('/', async (req, res) => {
  try {
    const items = await StudyPlan.find({ userId: DEMO_USER }).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('GET /api/studyplans', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, sessions, dueDate } = req.body;
    if (!title) return res.status(400).json({ success: false, error: 'Title required' });
    const item = new StudyPlan({ userId: DEMO_USER, title: title.trim(), description: description || '', sessions: sessions || 0, dueDate: dueDate ? new Date(dueDate) : null });
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error('POST /api/studyplans', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid id' });
    const updates = req.body;
    const item = await StudyPlan.findOneAndUpdate({ _id: id, userId: DEMO_USER }, { $set: updates }, { new: true });
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('PUT /api/studyplans', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid id' });
    const item = await StudyPlan.findOneAndDelete({ _id: id, userId: DEMO_USER });
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('DELETE /api/studyplans', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
