const express = require('express');
const router = express.Router();

const { addMatkul, getAllMatkul } = require('../controllers/matkul');

router.get('/', getAllMatkul);
router.post('/', addMatkul);

module.exports = router;
