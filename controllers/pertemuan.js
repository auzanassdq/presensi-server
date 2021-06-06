const { Pertemuan, AmbilMatkul, Kehadiran } = require("../models");
const kehadiran = require("./kehadiran");

module.exports = {
  getAllPertemuan: async (req, res, next) => {
    try {
      let query = req.query;
      let pertemuan;
      if (query) {
        pertemuan = await Pertemuan.find(
          { matkul: query.matkul },
          "-matkul -__v"
        )
          .populate("kehadiran")
          .sort({ nama: "desc" });
      } else {
        pertemuan = await Pertemuan.find();
      }

      res.json({
        message: "success get data",
        data: pertemuan,
      });
    } catch (error) {
      next(error);
    }
  },

  getPertemuanByID: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.findById(req.params.id);

      res.json({
        message: "success get data",
        data: pertemuan,
      });
    } catch (error) {
      next(error);
    }
  },

  getPertemuanMatkul: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.find({
        matkul: req.params.matkulId,
      }).sort({ nama: "desc" });

      res.json({
        message: "success get data",
        data: pertemuan,
      });
    } catch (error) {
      next(error);
    }
  },

  addPertemuan: async (req, res, next) => {
    try {
      const pertemuan = new Pertemuan(req.body);

      const mahasiswaAmbilMatkul = await AmbilMatkul.find({
        matkul: req.body.matkul,
      });
      for (let i = 0; i < mahasiswaAmbilMatkul.length; i++) {
        let kehadiran = await Kehadiran.create({
          pertemuan: pertemuan._id,
          mahasiswa: mahasiswaAmbilMatkul[i].mahasiswa,
        });
        pertemuan.kehadiran.push(kehadiran._id);
      }
      pertemuan.save();

      res.json({
        message: "success create data",
        data: pertemuan,
      });
    } catch (error) {
      next(error);
    }
  },

  editPertemuanByID: async (req, res, next) => {
    try {
      const pertemuan = await Pertemuan.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      res.json({
        message: "success edited matkul",
        data: pertemuan,
      });
    } catch (error) {
      next(error);
    }
  },

  getUpcomingPertemuan: async (req, res, next) => {
    try {
      const matkul = await AmbilMatkul.find({
        mahasiswa: req.params.mahasiswaId,
      });
      let pertemuan = [];

      for (let i = 0; i < matkul.length; i++) {
        let pertemuanByMatkul = await Pertemuan.find({
          matkul: matkul[i].matkul,
        }).populate("matkul", "nama");
        pertemuan = [...pertemuan, ...pertemuanByMatkul];
      }

      pertemuan = pertemuan.sort(function (a, b) {
        return a.jadwal - b.jadwal;
      });

      pertemuan = pertemuan.find((item) => item.jadwal > Date.now());

      pertemuan ? (pertemuan = pertemuan.toObject()) : (pertemuan = {});
      let { kehadiran, ...current } = pertemuan;

      // let upcoming = pertemuan.reduce((prev, curr) => prev.jadwal > Date.now() && prev.jadwal < curr.jadwal ? prev : curr)

      // let { kehadiran, ...upcoming } = pertemuan
      //   .reduce((prev, curr) =>
      //     prev.jadwal > Date.now() && prev.jadwal < curr.jadwal ? prev : curr
      //   )
      //   .toObject();

      res.json({
        massage: "success get upcoming pertemuan",
        data: pertemuan,
      });
    } catch (error) {
      next(error);
    }
  },

  getCurrentPertemuan: async (req, res, next) => {
    try {
      const matkul = await AmbilMatkul.find({
        mahasiswa: req.params.mahasiswaId,
      });
      let pertemuan = [];

      // console.log(matkul);

      for (let i = 0; i < matkul.length; i++) {
        let pertemuanByMatkul = await Pertemuan.find({
          matkul: matkul[i].matkul,
        }).populate("matkul", "nama");
        pertemuan = [...pertemuan, ...pertemuanByMatkul];
      }

      pertemuan = pertemuan.sort(function (a, b) {
        return a.jadwal - b.jadwal;
      });

      pertemuan = pertemuan.find(
        (item) =>
          item.jadwal <= Date.now() &&
          Date.now() <= new Date(item.jadwal).getTime() + 1800000
      );

      pertemuan ? (pertemuan = pertemuan.toObject()) : (pertemuan = {});

      let { kehadiran, ...current } = pertemuan;

      // let upcoming = pertemuan.reduce((prev, curr) => prev.jadwal > Date.now() && prev.jadwal < curr.jadwal ? prev : curr)

      // let { kehadiran, ...current } = pertemuan
      // .reduce((prev, curr) =>
      //   prev.jadwal <= Date.now() && Date.now() <= new Date(prev.jadwal).getTime() + 1800000
      //    ? prev : curr
      // )
      // .toObject();

      res.json({
        massage: "success get current pertemuan",
        data: current,
      });
    } catch (error) {
      next(error);
    }
  },
};
