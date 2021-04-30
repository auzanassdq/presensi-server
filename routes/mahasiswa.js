const express = require('express');
const router = express.Router();

const {
  getAllMahasiswa, 
  getMahasiswaByID, 
  addMahasiswa, 
  addMatkulToMahasiswa,
  delMatkulFromMahasiswa,
} = require('../controllers/mahasiswa');

router.get('/', getAllMahasiswa);
router.get('/:id', getMahasiswaByID);
router.post('/', addMahasiswa);
router.put("/matkul-add/:id", addMatkulToMahasiswa)
router.put("/matkul-del/:id", delMatkulFromMahasiswa)

module.exports = router;
