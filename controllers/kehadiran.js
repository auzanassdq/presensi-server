const { Kehadiran } = require("../models")

module.exports = {
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