const express = require('express');
const router = express.Router();

const { 
  getAllPertemuan,
  getPertemuanByID,
  addPertemuan,
  getPertemuanMatkul
 } = require('../controllers/pertemuan');

router.get('/', getAllPertemuan);
router.get('/matkul/:matkulId', getPertemuanMatkul);
router.get('/:id', getPertemuanByID);
router.post('/', addPertemuan);

module.exports = router;
