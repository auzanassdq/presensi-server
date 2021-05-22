const { Pertemuan, AmbilMatkul, Kehadiran } = require("../models")

module.exports = {
  getAllPertemuan: async (req, res, next) => {
    try {
      let query = req.query
      let pertemuan
      if (query) {
        pertemuan = await Pertemuan.find({matkul: query.matkul}, "-matkul -__v").populate("kehadiran").sort({nama: "desc"})
      } else {
        pertemuan = await Pertemuan.find()
      }

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
      const pertemuan = new Pertemuan(req.body)

      const mahasiswaAmbilMatkul = await AmbilMatkul.find({matkul: req.body.matkul})
      for (let i = 0; i< mahasiswaAmbilMatkul.length; i++){
        let kehadiran = await Kehadiran.create({
          pertemuan: pertemuan._id,
          mahasiswa: mahasiswaAmbilMatkul[i].mahasiswa
        })
        pertemuan.kehadiran.push(kehadiran._id)
      }
      pertemuan.save()
      
      res.json({
        message: "success create data",
        data: pertemuan
      })
    } catch (error) {
      next(error)
    }
  },

  editPertemuanByID: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.findByIdAndUpdate(req.params.id, req.body)

      res.json({
        message: "success edited matkul",
        data: pertemuan
      })
    } catch (error) {
      next(error);
    }
  }
}