require("dotenv").config()
const mongoose = require('mongoose');

const database = process.env.DATABASE || 'mongodb://localhost/presensi'

mongoose.connect(database, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

module.exports = db