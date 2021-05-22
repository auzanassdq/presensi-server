const express = require('express');
const router = express.Router();

const { 
  getAllPertemuan,
  getPertemuanByID,
  addPertemuan,
  editPertemuanByID,
  getPertemuanMatkul
 } = require('../controllers/pertemuan');

router.get('/', getAllPertemuan);
router.get('/matkul/:matkulId', getPertemuanMatkul);
router.get('/:id', getPertemuanByID);
router.put('/:id', editPertemuanByID);
router.post('/', addPertemuan);

module.exports = router;
