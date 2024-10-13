const express = require('express');
const {
  createTable,
  getAllTables,
  generateQRForTable,
  addMenuToTable,
} = require('./table.controller');

const router = express.Router();

router.post('/', createTable);
router.post('/:tableId', generateQRForTable);
router.get('/', getAllTables);
router.post('/:menuId', addMenuToTable);

module.exports = router;
