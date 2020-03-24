const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  avatar: {
    type: Buffer,
  },
});

// A middleware which populate before save() being executed
// Hash the plain password before saving
// Should above mongoose.model()
userSchema.pre('save', async function hashed(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function remove(next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });
  next();
});

// Static functions to user model, compare the email and password are matching
// call findByCredentials from application when users need to login.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.methods.toJSON = function toJson() {
  const user = this;
  const userObject = user.toObject();

  // delete sensitve data, password and tokens
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function genToken() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return token;
};

userSchema.virtual('tasks', {
  ref: 'Task', // Should be exactly same as model 'Task'
  localField: '_id', // The owener ObjectId on the tasks and that is assciated with the id of the user here
  foreignField: 'owner', // The name of the field where user data should be stored
});

const User = mongoose.model('User', userSchema);

module.exports = User;
