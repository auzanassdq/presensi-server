const express = require('express');
const router = express.Router();

const {
  getAllMahasiswa, 
  getMahasiswaByID, 
  addMahasiswa, 
  editMahasiswaByID,
  deleteMahasiswaByID,
  addMatkulToMahasiswa,
  delMatkulFromMahasiswa,
} = require('../controllers/mahasiswa');

router.get('/', getAllMahasiswa);
router.get('/:id', getMahasiswaByID);
router.post('/', addMahasiswa);
router.put('/:id', editMahasiswaByID);
router.delete('/:id', deleteMahasiswaByID);
// router.put("/matkul-add/:id", addMatkulToMahasiswa)
// router.put("/matkul-del/:id", delMatkulFromMahasiswa)

module.exports = router;
