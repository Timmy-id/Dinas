const express = require('express');
const { createMenu } = require('./menu.controller');

const router = express.Router();

router.post('/', createMenu);

module.exports = router;
