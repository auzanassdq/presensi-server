const bcrypt = require('bcryptjs');

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
      let data = { ...req.body }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      data.password = hash

      const mahasiswa = await Mahasiswa.create(data)
      // const mahasiswa = await Mahasiswa.create(req.body)

      res.json({
        message: "success add data mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  },

  editMahasiswaByID: async (req, res, next) => {
    try {
      let {password, ...data} = { ...req.body }
      let mahasiswa

      if (password == "") {
        mahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, data)
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        data.password = hash

        mahasiswa = await Mahasiswa.findByIdAndUpdate(req.params.id, data)
      }

      res.json({
        message: "success edited mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  }, 

  deleteMahasiswaByID: async (req, res, next) => {
    try {
      const mahasiswa = await Mahasiswa.findById(req.params.id)
      mahasiswa.remove()

      res.json({
        message: "success deleted mahasiswa",
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