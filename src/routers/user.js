const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['name', 'email', 'password', 'age'];
  const isValidateOperation = updates.every((update) => allowUpdates.includes(update));

  if (!isValidateOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    // Iterate req.body to update user, which will send to hashed password middleware
    updates.forEach((update) => { user[update] = req.body[update]; });
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(401).send();
    }

    return res.send(user);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
