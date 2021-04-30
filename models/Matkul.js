const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const matkulSchema = new Schema({
  kode: String,
  nama: String,
  sks: Number,
  semester: Number,
  pengajar: {
    type: Types.ObjectId,
    ref: "dosen"
  },
}, {
  collection: 'matkul'
});

const Matkul = mongoose.model('matkul', matkulSchema);

module.exports = Matkul
