const express = require('express');
const router = express.Router();

const { addMatkul, getAllMatkul, deleteMatkul } = require('../controllers/matkul');

router.get('/', getAllMatkul);
router.post('/', addMatkul);
router.delete('/:id', deleteMatkul);

module.exports = router;
