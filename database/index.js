const mongoose = require('mongoose');
const config = require('../config');

const MONGO_URI = 'mongodb://localhost/hn-clone';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}, MONGO_URI: ${MONGO_URI}`);
    mongoose.set('debug', true);
    mongoose.Promise = Promise;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;