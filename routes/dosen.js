const express = require('express');
const router = express.Router();

const {getAllDosen, getDosenByID, addDosen, editDosenByID, deleteDosenByID} = require('../controllers/dosen');

router.get('/', getAllDosen);
router.get('/:id', getDosenByID);
router.post('/', addDosen);
router.put('/:id', editDosenByID);
router.delete('/:id', deleteDosenByID);

module.exports = router;
