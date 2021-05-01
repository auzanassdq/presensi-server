const express = require('express');
const router = express.Router();

const { 
  getAllPertemuan,
  getPertemuanByID,
  addPertemuan
 } = require('../controllers/pertemuan');

router.get('/', getAllPertemuan);
router.get('/:id', getPertemuanByID);
router.post('/', addPertemuan);

module.exports = router;
