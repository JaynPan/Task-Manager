const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  user.validate((err) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    return true;
  });

  const { name, email, password } = user;
  const isEmailTaken = await User.countDocuments({ email });

  if (isEmailTaken) {
    return res.status(400).send({ error: 'Email has already been taken.' });
  }

  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_SECRET,
    { expiresIn: '20m' },
  );

  const emailData = {
    to: email,
    from: 'jpan0831@gmail.com',
    subject: 'Welcome to Task Manager! Confirm Your Email',
    html: `
          <h1>You're on your way! Let's confirm your email address.</h1>
          <p>Please click the given link below to activate account!</p>
          <p>
            <a href="http://${process.env.API_ENDPOINT}/users/activate/${token}" target="_blank">
              Confirm Email Address
            </a>
          </p>
    `,
  };

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send(emailData);
    return res.send({ message: 'Email has been sent, kindly activate your account.' });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

router.get('/users/activate/:id', async (req, res) => {
  const token = req.params.id;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { name, email, password } = decodedToken;
      const newUser = new User({ name, email, password });

      try {
        await newUser.save();
        return res.redirect(301, `${process.env.CLIENT_URL_DEV}/login`);
      } catch (e) {
        return res.status(400).send({ error: 'Email has already been verified successfully!' });
      }
    } catch (e) {
      return res.status(400).send({ error: 'Incorrect or expired link.' });
    }
  }

  return res.status(400).send('something went wrong.');
});

// Delete the auth token in user data
router.post('/users/logout', auth, async (req, res) => {
  try {
    // filter out the token the user used
    req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
    await req.user.save();
    res.sendStatus(200);
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
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    return cb(undefined, true);
  },
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

  req.user.avatar = buffer;
  await req.user.save();
  res.status(200).send();
// eslint-disable-next-line no-unused-vars
}, (error, req, res, next) => { // should list all four arguments, so express know this is design to handle errors
  res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
