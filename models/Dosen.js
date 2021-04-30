const mongoose = require('mongoose');
const { Schema } = mongoose;

const dosenSchema = new Schema({
  nidn: String,
  nama: String,
  email: String,
  password: String,
  username: String,
}, {
  collection: 'dosen'
});

const Dosen = mongoose.model('dosen', dosenSchema);

module.exports = Dosen