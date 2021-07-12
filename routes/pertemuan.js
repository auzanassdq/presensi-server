const express = require('express');
const router = express.Router();

const { 
  getAllPertemuan,
  getPertemuanByID,
  getUpcomingPertemuan,
  getCurrentPertemuan,
  addPertemuan,
  editPertemuanByID,
  getPertemuanMatkul,
  deletePertemuan,
 } = require('../controllers/pertemuan');

router.get('/', getAllPertemuan);
router.get('/:id', getPertemuanByID);
router.get('/matkul/:matkulId', getPertemuanMatkul);
router.get('/upcoming/:mahasiswaId', getUpcomingPertemuan);
router.get('/current/:mahasiswaId', getCurrentPertemuan);
router.put('/:id', editPertemuanByID);
router.post('/', addPertemuan);
router.delete('/:id', deletePertemuan);

module.exports = router;
