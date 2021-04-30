const express = require('express');
const router = express.Router();

const {
  login, 
  regisMahasiswa,
} = require('../controllers/auth');

router.post('/login', login);
router.post('/regis/mahasiswa', regisMahasiswa);

module.exports = router;
