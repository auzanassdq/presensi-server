const express = require('express');
const router = express.Router();

const { 
  addAmbilMatkul, 
  getAllAmbilMatkul, 
  checkAmbilMatkul,
  getAmbilMatkulByID,
  getMatkulByMahasiswa,
  removeAmbilMatkul
} = require('../controllers/ambilMatkul');

router.get('/', getAllAmbilMatkul);
router.get('/check', checkAmbilMatkul);
router.get('/:id', getAmbilMatkulByID);
router.get('/mahasiswa/:mahasiswaId', getMatkulByMahasiswa);
router.post('/', addAmbilMatkul);
router.delete('/', removeAmbilMatkul);

module.exports = router;
