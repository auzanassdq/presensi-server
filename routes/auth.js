const express = require('express');
const router = express.Router();

const {
  getAllMahasiswa, 

} = require('../controllers/mahasiswa');

router.get('/', getAllMahasiswa);

module.exports = router;
