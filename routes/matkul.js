const express = require('express');
const router = express.Router();

const { 
  addMatkul, 
  getAllMatkul, 
  deleteMatkul, 
  getMatkulByID 
} = require('../controllers/matkul');

router.get('/', getAllMatkul);
router.get('/:id', getMatkulByID);
router.post('/', addMatkul);
router.delete('/:id', deleteMatkul);

module.exports = router;
