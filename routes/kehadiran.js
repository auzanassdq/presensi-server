const express = require('express');
const router = express.Router();

const { hadirCheckIn, getKehadiran } = require('../controllers/kehadiran');

router.get('/', getKehadiran)
router.put('/check-in', hadirCheckIn)

module.exports = router;
