const {Matkul} = require('../models');

module.exports = {
  getAllMatkul: async (req, res, next) => {
    try {
      const matkul = await Matkul.find()

      res.json({
        message: "success get data matkul",
        data: matkul
      })
    } catch (error) {
      next(error)
    }
  },

  getMatkulByID: async (req, res, next) => {
    try {
      const matkul = await Matkul.findById(req.params.id)

      res.json({
        message: "success get data matkul",
        data: matkul
      })
    } catch (error) {
      next(error)
    }
  },

  addMatkul: async (req, res, next) => {
    try {
      const matkul = await Matkul.create(req.body)

      res.json({
        message: "success add data matkul",
        data: matkul
      })
    } catch (error) {
      next(error);
    }
  },

  deleteMatkul: async (req, res, next) => {
    try {
      const matkul = await Matkul.findById(req.params.id)
      matkul.remove()

      res.json({
        message: "success deleted matkul",
      })
    } catch (error) {
      next(error);
    }
  },

  editMatkul: async (req, res, next) => {
    try {
      const matkul = await Matkul.findByIdAndUpdate(req.params.id, req.body)

      res.json({
        message: "success edited matkul",
        data: matkul
      })
    } catch (error) {
      next(error);
    }
  },
}