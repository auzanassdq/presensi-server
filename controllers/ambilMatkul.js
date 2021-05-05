const {AmbilMatkul} = require("../models/")

module.exports = {
  getAllAmbilMatkul: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.find()

      res.json({
        message: "success get data",
        data: ambilMatkul
      })
    } catch (error) {
      next(error)
    }
  },

  getAmbilMatkulByID: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.findById(req.params.id)

      res.json({
        message: "success get data",
        data: ambilMatkul
      })
    } catch (error) {
      next(error)
    }
  },

  getMatkulByMahasiswa: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul
      .find({mahasiswa: req.params.mahasiswaId})
      .populate("matkul")

      res.json({
        message: "success get data",
        data: ambilMatkul
      })
    } catch (error) {
      next(error)
    }
  },

  addAmbilMatkul: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.create(req.body)
      res.json({
        message: "success join to matkul",
        data: ambilMatkul
      })
    } catch (error) {
      next(error)
    }
  },
}