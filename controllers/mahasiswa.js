const {Mahasiswa} = require('../models');

module.exports = {
  getAllMahasiswa: async (req, res, next) => {
    try {
      const mahasiswa = await Mahasiswa.find()

      res.json({
        message: "success get data mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error)
    }
  },

  getMahasiswaByID: async (req, res, next) => {
    try {
      const mahasiswa = await Mahasiswa.findById(req.params.id, "-__v").populate("matkul", "-__v")

      res.json({
        message: "success get mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  },

  addMahasiswa: async (req, res, next) => {
    try {
      const mahasiswa = await Mahasiswa.create(req.body)

      res.json({
        message: "success add data mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  },

  addMatkulToMahasiswa: async (req, res, next) => {
    try {
      const mahasiswa = await Mahasiswa.findById(req.params.id)
      mahasiswa.matkul.push(req.body.matkulID)
      await mahasiswa.save();

      res.json({
        message: "success update mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  },

  delMatkulFromMahasiswa: async (req, res, next) => {
    try {
      const mahasiswa = await Mahasiswa.findById(req.params.id)
      let matkulIndex = mahasiswa.matkul.indexOf(req.body.matkulID)
      mahasiswa.matkul.splice(matkulIndex, 1)
      await mahasiswa.save();
      
      res.json({
        message: "success update mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  },


}