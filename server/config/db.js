const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = process.env.MONGO_URL;

mongoose
  .connect(connectDB)
  .then(() => {
    console.log('Mongo Connected ...');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
