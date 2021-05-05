const express = require('express');
const router = express.Router();

const { 
  addAmbilMatkul, 
  getAllAmbilMatkul, 
  getAmbilMatkulByID,
  getMatkulByMahasiswa
} = require('../controllers/ambilMatkul');

router.get('/', getAllAmbilMatkul);
router.get('/:id', getAmbilMatkulByID);
router.get('/mahasiswa/:mahasiswaId', getMatkulByMahasiswa);
router.post('/', addAmbilMatkul);

module.exports = router;
