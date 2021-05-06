const { Kehadiran } = require("../models")

module.exports = {
  getKehadiran: async (req, res, next) => {
    try {
      let pertemuaId = req.query.pertemuanId
      let kehadiran = await Kehadiran.findOne({pertemuan: pertemuaId})

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
      const pertemuan = await Kehadiran.findOne(req.body)

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
}