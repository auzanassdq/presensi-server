// var tf = require('@tensorflow/tfjs-node');
const express = require('express');
const router = express.Router();

const authToken = require('../middlewares/authentication');
const mahasiswaRouter = require("./mahasiswa")
const matkulRouter = require("./matkul")
const ambilMatkulRouter = require("./ambilMatkul")
const pertemuanRouter = require("./pertemuan")
const kehadiranRouter = require("./kehadiran")



const auth = require('./auth');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json({
    message: "wellcome to express"
  })
});

router.use("/auth", auth)
router.use(authToken)
router.use("/mahasiswa", mahasiswaRouter)
router.use("/matkul", matkulRouter)
router.use("/ambil-matkul", ambilMatkulRouter)
router.use("/pertemuan", pertemuanRouter)
router.use("/kehadiran", kehadiranRouter)

module.exports = router;
