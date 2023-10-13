const express = require('express');
const router = express.Router();
const { fetchData } = require('../controllers/apiController');

router.get('/data', fetchData);

module.exports = router;
