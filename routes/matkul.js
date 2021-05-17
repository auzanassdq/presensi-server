const express = require('express');
const router = express.Router();

const { 
  addMatkul, 
  getAllMatkul, 
  deleteMatkul, 
  getMatkulByID, 
  editMatkul
} = require('../controllers/matkul');

router.get('/', getAllMatkul);
router.get('/:id', getMatkulByID);
router.post('/', addMatkul);
router.put('/:id', editMatkul);
router.delete('/:id', deleteMatkul);

module.exports = router;
