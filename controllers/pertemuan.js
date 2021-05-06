const { Pertemuan } = require("../models")

module.exports = {
  getAllPertemuan: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.find()
      
      res.json({
        message: "success get data",
        data: pertemuan
      })
    } catch (error) {
      next(error)
    }
  }, 

  getPertemuanByID: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.findById(req.params.id)
      
      res.json({
        message: "success get data",
        data: pertemuan
      })
    } catch (error) {
      next(error)
    }
  },

  getPertemuanMatkul: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.find({matkul: req.params.matkulId}).sort({nama: "desc"})
      
      res.json({
        message: "success get data",
        data: pertemuan
      })
    } catch (error) {
      next(error)
    }
  }, 

  addPertemuan: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.create(req.body)
      
      res.json({
        message: "success create data",
        data: pertemuan
      })
    } catch (error) {
      next(error)
    }
  },
}