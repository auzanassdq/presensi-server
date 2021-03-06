const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const mahasiswaSchema = new Schema({
  username: String,
  nim: String,
  nama: String,
  email: String,
  password: String,
  jurusan: String,
  angkatan: Number,
  // semester: Number,
}, {
  collection: 'mahasiswa'
});

const Mahasiswa = mongoose.model('mahasiswa', mahasiswaSchema);

module.exports = Mahasiswa
