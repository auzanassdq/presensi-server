const express = require('express');
const router = express.Router();

const { hadirCheckIn } = require('../controllers/kehadiran');

router.put('/check-in', hadirCheckIn);

module.exports = router;
