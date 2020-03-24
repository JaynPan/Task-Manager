const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    if (err.message.includes('E11000 duplicate key')) {
      err.message = 'Email has already been taken!';
    }

    res.status(400).send({ error: err.message });
  }
});

// Delete the auth token in user data
router.post('/users/logout', auth, async (req, res) => {
  try {
    // filter out the token the user used
    req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
    await req.user.save();
    res.send(200);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// 1. through the auth middleware and check if is authenticated
// 2. return back with req.user
// 3. save to database if all of the updates have valid key
// 4. send the req back with updated info
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['name', 'email', 'password', 'age'];
  const isValidateOperation = updates.every((update) => allowUpdates.includes(update));

  if (!isValidateOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // Iterate req.body to update user, which will send to hashed password middleware
    updates.forEach((update) => { req.user[update] = req.body[update]; });
    await req.user.save();
    return res.send(req.user);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    return res.send(req.user);
  } catch (err) {
    return res.sendStatus(500);
  }
});

const upload = multer({
  dest: 'avatar',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be a PDF'));
    }

    return cb(undefined, true);
  },
});

router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
  res.status(200).send();
});

module.exports = router;
