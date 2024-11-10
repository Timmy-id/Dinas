const express = require('express');
const { Pagination, AuthToken } = require('../../middlewares');
const {
  createMenu,
  getMenu,
  getAllMenus,
  deleteMenu,
  updateMenu,
} = require('./menu.controller');
const { upload } = require('../../utils');

const router = express.Router();

router.post('/', AuthToken, upload.single('imageUrl'), createMenu);
router.get('/', AuthToken, Pagination, getAllMenus);
router.get('/:menuId', AuthToken, getMenu);
router.delete('/:menuId', AuthToken, deleteMenu);
router.patch('/:menuId', AuthToken, updateMenu);

module.exports = router;
