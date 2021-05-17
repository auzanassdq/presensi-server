const mongoose = require('mongoose');
const AmbilMatkul = require('./AmbilMatkul');
const Kehadiran = require('./Kehadiran');
const { Schema, Types } = mongoose;

const pertemuanSchema = new Schema({
  nama: String,
  matkul: {
    type: Types.ObjectId,
    ref: "matkul"
  },
  jadwal: {
    default : Date.now(),
    type: Date
  },
  kehadiran: [{
    type: Types.ObjectId,
    ref: "kehadiran"
  }]
}, {
  collection: 'pertemuan'
});

pertemuanSchema.pre('save', async function(next)  {
  const mahasiswaAmbilMatkul = await AmbilMatkul.find({matkul: this.matkul})
  for (let i = 0; i< mahasiswaAmbilMatkul.length; i++){
    let kehadiran = await Kehadiran.create({
      pertemuan: this._id,
      mahasiswa: mahasiswaAmbilMatkul[i].mahasiswa
    })
    this.kehadiran.push(kehadiran._id)
  }

  next()
})

const Pertemuan = mongoose.model('pertemuan', pertemuanSchema);

module.exports = Pertemuan
