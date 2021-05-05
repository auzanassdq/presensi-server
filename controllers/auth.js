require("dotenv").config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Mahasiswa} = require('../models');

module.exports = {
  login: async (req, res, next) => {
    try {
      let data = req.body
      let user = await Mahasiswa.findOne({username: data.username})
  
      if (!user || !bcrypt.compareSync(data.password, user.password)) {
        res.json({message: "invalid authentication"})
        return
      }
  
      let {_id, nim, nama, email, ...rest} = user
      let token = jwt.sign({_id,nim,nama,email}, process.env.JWT_SECRET);
      
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
      let data = {...req.body}

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