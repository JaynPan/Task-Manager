const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (err) {
    return res.status(500).send();
  }
});

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowUpdates = ['description', 'isCompleted'];
  const isValidateOperation = updates.every((update) => allowUpdates.includes(update));

  if (!isValidateOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(401).send();
    }

    return res.send(task);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
