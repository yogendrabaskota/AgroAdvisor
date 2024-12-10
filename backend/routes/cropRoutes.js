const express = require('express');
const { cropController } = require('../controller/cropController');

const router = express.Router();

router.post('/recommend', cropController)

module.exports = router
