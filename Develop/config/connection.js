require('dotenv').config();

const mongoose = require('mongoose');

const mongodb = async () => {
  await mongoose.connect('mongodb://localhost/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
};

mongodb();
module.exports = mongodb;
