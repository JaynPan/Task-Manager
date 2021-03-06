const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    // await req.user.populate('tasks').execPopulate()
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (err) {
    return res.status(500).send();
  }
});

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['description', 'isCompleted'];
  const isValidateOperation = updates.every((update) => allowUpdates.includes(update));

  if (!isValidateOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => { task[update] = req.body[update]; });
    task.save();

    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(401).send();
    }

    return res.send(task);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
