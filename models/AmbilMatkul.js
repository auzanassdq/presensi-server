const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ambilMatkulSchema = new Schema({
  mahasiswa: {
    type: Types.ObjectId,
    ref: "mahasiswa"
  },
  matkul: {
    type: Types.ObjectId,
    ref: "matkul"
  },
}, {
  collection: 'ambilMatkul'
});

const AmbilMatkul = mongoose.model('ambilMatkul', ambilMatkulSchema);

module.exports = AmbilMatkul
