const express = require('express');
const router = express.Router();

const { 
  addAmbilMatkul, 
  getAllAmbilMatkul, 
  getAmbilMatkulByID 
} = require('../controllers/ambilMatkul');

router.get('/', getAllAmbilMatkul);
router.get('/:id', getAmbilMatkulByID);
router.post('/', addAmbilMatkul);

module.exports = router;
