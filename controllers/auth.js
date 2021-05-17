require("dotenv").config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Mahasiswa, Dosen } = require('../models');

module.exports = {
  login: async (req, res, next) => {
    try {
      let data = req.body
      let role = "mahasiswa"

      console.log(data);

      if (data.username === process.env.ADMIN_USERNAME && data.password === process.env.ADMIN_PASSWORD) {
        console.log("ADMIN");
        let token = jwt.sign({
          nama: process.env.ADMIN_USERNAME,
          role: process.env.ADMIN_USERNAME,
          _id: process.env.ADMIN_USERNAME,
        }, process.env.JWT_SECRET);
        res.json({
          message: "login success",
          userId: process.env.ADMIN_USERNAME,
          token,
        })
        return
      }

      let user = await Mahasiswa.findOne({ username: data.username })
      if (!user) {
        role = "dosen"
        user = await Dosen.findOne({ username: data.username })
      }

      if (!user || !bcrypt.compareSync(data.password, user.password)) {
        res.json({ message: "invalid authentication" })
        return
      }

      let { _id, nama, ...rest } = user
      let token = jwt.sign({ _id, nama, role }, process.env.JWT_SECRET);

      res.json({
        message: "login success",
        token,
        userId: _id
      })
    } catch (error) {
      next(error)
    }
  },

  regisMahasiswa: async (req, res, next) => {
    try {
      let data = { ...req.body }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      data.password = hash

      const mahasiswa = await Mahasiswa.create(data)

      res.json({
        message: "success create data mahasiswa",
        data: mahasiswa
      })
    } catch (error) {
      next(error);
    }
  }
}