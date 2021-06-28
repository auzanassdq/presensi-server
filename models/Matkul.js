const mongoose = require('mongoose');
const Mahasiswa = require('./Mahasiswa');
const { Schema, Types } = mongoose;

const matkulSchema = new Schema({
  kode: String,
  nama: String,
  sks: Number,
  semester: Number,
  dosen: {
    type: Types.ObjectId,
    ref: "dosen"
  },
  jadwal: {
    default : Date.now(),
    type: Date
  },
}, {
  collection: 'matkul'
});

// matkulSchema.post('remove', function(doc, next)  {
//   console.log(doc)
//   next()
// })

const Matkul = mongoose.model('matkul', matkulSchema);
module.exports = Matkul
