const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.port || 3001;

app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save().then(() => {
    res.status(201).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch(() => {
    res.status(500).send();
  });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task.save().then(() => {
    res.status(201).send(task);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.listen(port, () => {
  console.log('Server is up on port', port);
});