const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set('useCreateIndex', true);
