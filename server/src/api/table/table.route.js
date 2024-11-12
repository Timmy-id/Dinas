const express = require('express');
const {
  createTable,
  getAllTables,
  generateQRForTable,
  addMenuToTable,
  getSingleTable,
  getAllMenusForTable,
} = require('./table.controller');
const { AuthToken, Pagination } = require('../../middlewares');
const { upload } = require('../../utils');

const router = express.Router();

router.post('/', AuthToken, createTable);
router.post('/:tableId/generate', AuthToken, generateQRForTable);
router.get('/', AuthToken, Pagination, getAllTables);
router.get('/:tableId/menus', AuthToken, getAllMenusForTable);
router.get('/:tableId', AuthToken, getSingleTable);
router.post(
  '/:tableId/menus',
  AuthToken,
  upload.single('imageUrl'),
  addMenuToTable,
);

module.exports = router;
