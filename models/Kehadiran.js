const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const kehadiranSchema = new Schema({
  mahasiswa: {
    type: Types.ObjectId,
    ref: "mahasiswa"
  },
  pertemuan: {
    type: Types.ObjectId,
    ref: "pertemuan"
  },
  checkIn: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'kehadiran'
});

const Kehadiran = mongoose.model('kehadiran', kehadiranSchema);

module.exports = Kehadiran
