const express = require('express');
const router = express.Router();

const { hadirCheckIn, editKehadiranById, getKehadiran } = require('../controllers/kehadiran');

router.get('/', getKehadiran)
router.put('/:id', editKehadiranById)
router.post('/', hadirCheckIn)

module.exports = router;
