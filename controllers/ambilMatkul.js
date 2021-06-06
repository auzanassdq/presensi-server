const { AmbilMatkul, Matkul, Pertemuan, Kehadiran } = require("../models/");

module.exports = {
  getAllAmbilMatkul: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.find();

      res.json({
        message: "success get data",
        data: ambilMatkul,
      });
    } catch (error) {
      next(error);
    }
  },

  checkAmbilMatkul: async (req, res, next) => {
    try {
      console.log("TESSSSSSSSSSSSSSSSSSSSSSSSSSS");
      const data = req.query;
      let ambilMatkul;

      console.log(data);

      ambilMatkul = await AmbilMatkul.findOne(data);
      console.log("TEEES", ambilMatkul);

      if (ambilMatkul) {
        res.status(300).json({
          message: "Matkul already registered",
        });
      } else {
        res.status(200).json({
          message: "Matkul not yet register",
        });
      }
    } catch (error) {
      next(error);
    }
  },

  getAmbilMatkulByID: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.findById(req.params.id);

      res.json({
        message: "success get data",
        data: ambilMatkul,
      });
    } catch (error) {
      next(error);
    }
  },

  getMatkulByMahasiswa: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.find({
        mahasiswa: req.params.mahasiswaId,
      }).populate("matkul");

      res.json({
        message: "success get data",
        data: ambilMatkul,
      });
    } catch (error) {
      next(error);
    }
  },

  addAmbilMatkul: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.create(req.body);

      const pertemuan = await Pertemuan.find({ matkul: req.body.matkul });

      for (let i = 0; i < pertemuan.length; i++) {
        let kehadiran = await Kehadiran.create({
          pertemuan: pertemuan[i]._id,
          mahasiswa: req.body.mahasiswa,
        });

        const pertemuanItem = await Pertemuan.findById(pertemuan[i]._id);
        console.log(pertemuanItem);

        pertemuanItem.kehadiran.push(kehadiran._id);
        pertemuanItem.save();
      }

      res.status(200).json({
        message: "success join to matkul",
        data: ambilMatkul,
      });
    } catch (error) {
      next(error);
    }
  },

  removeAmbilMatkul: async (req, res, next) => {
    try {
      const ambilMatkul = await AmbilMatkul.findOne(req.body);

      const pertemuan = await Pertemuan.find({ matkul: req.body.matkul });

      for (let i = 0; i < pertemuan.length; i++) {
        let kehadiran = await Kehadiran.findOne({
          pertemuan: pertemuan[i]._id,
          mahasiswa: req.body.mahasiswa,
        });

        const pertemuanItem = await Pertemuan.findById(pertemuan[i]._id);

        let index = pertemuanItem.kehadiran.indexOf(kehadiran._id)
        pertemuanItem.kehadiran.splice(index, 1)
        
        pertemuanItem.save();

        kehadiran.delete()
      }

      ambilMatkul.delete()

      res.status(200).json({
        message: "success join to matkul",
        data: ambilMatkul,
      });
    } catch (error) {
      next(error);
    }
  },
};
