// var tf = require('@tensorflow/tfjs-node');
const express = require('express');
const router = express.Router();
const mahasiswaRouter = require("./mahasiswa")
const matkulRouter = require("./matkul")
const ambilMatkulRouter = require("./ambilMatkul")
const pertemuanRouter = require("./pertemuan")


const auth = require('./auth');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json({
    message: "wellcome to express"
  })
});

router.use("/auth", auth)
router.use("/mahasiswa", mahasiswaRouter)
router.use("/matkul", matkulRouter)
router.use("/ambil-matkul", ambilMatkulRouter)
router.use("/pertemuan", pertemuanRouter)


module.exports = router;
