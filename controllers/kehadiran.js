const { Kehadiran } = require("../models")

module.exports = {
  getKehadiran: async (req, res, next) => {
    try {
      let {pertemuan} = req.query
      let kehadiran = await Kehadiran.find({pertemuan}).populate("mahasiswa")

      res.json({
        message: "success get data",
        data: kehadiran
      })
    } catch (error) {
      next(error)
    }
  },

  hadirCheckIn: async (req, res, next) => {
    try {
      console.log("tesees");
      console.log(req.body.mahasiswa);
      const pertemuan = await Kehadiran.findOne(req.body)
      console.log(pertemuan);

      if (!pertemuan.status) {
        pertemuan.status = true
        pertemuan.checkIn = Date.now()
        pertemuan.save()

        res.json({
          message: "success checkIn",
          data: pertemuan
        })
        return
      }
      
      res.json({
        message: "you're already checkIn",
      })
    } catch (error) {
      next(error)
    }
  }, 

  editKehadiranById: async (req, res, next) => {
    try {
      // const {status} = req.body

      const pertemuan = await Kehadiran.findByIdAndUpdate(req.params.id, req.body)
      
      res.json({
        message: "success edit",
        data: pertemuan
      })
    } catch (error) {
      next(error)
    }
  }, 
}