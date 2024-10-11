const express = require('express');
const {
  createTable,
  getAllTables,
  addMenuToTable,
} = require('./table.controller');

const router = express.Router();

router.post('/', createTable);
router.get('/', getAllTables);
router.post('/:menuId', addMenuToTable);

module.exports = router;
