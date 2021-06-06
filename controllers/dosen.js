const bcrypt = require('bcryptjs');
const { Dosen } = require("../models")

module.exports = {
  getAllDosen: async (req, res, next) => {
    try {
      let dosen = await Dosen.find()

      res.json({
        message: "success get data",
        data: dosen
      })
    } catch (error) {
      next(error)
    }
  }, 

  getDosenByID: async (req, res, next) => {
    try {
      const dosen = await Dosen.findById(req.params.id)
      
      res.json({
        message: "success get data",
        data: dosen
      })
    } catch (error) {
      next(error)
    }
  },

  addDosen: async (req, res, next) => {
    try {
      let data = { ...req.body }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      data.password = hash

      const dosen = await Dosen.create(data)

      res.json({
        message: "success add data dosen",
        data: dosen
      })
    } catch (error) {
      next(error);
    }
  },

  editDosenByID: async (req, res, next) => {
    try {
      let {password, ...data} = { ...req.body }
      let dosen

      if (password == "") {
        dosen = await Dosen.findByIdAndUpdate(req.params.id, data)
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash

        dosen = await Dosen.findByIdAndUpdate(req.params.id, data)
      }

      res.json({
        message: "success edited dosen",
        data: dosen
      })
    } catch (error) {
      next(error);
    }
  }, 

  deleteDosenByID: async (req, res, next) => {
    try {
      const dosen = await Dosen.findById(req.params.id)
      dosen.remove()

      res.json({
        message: "success deleted dosen",
      })
    } catch (error) {
      next(error);
    }
  },
}