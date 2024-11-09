const express = require('express');
const { Pagination } = require('../../middlewares');
const {
  createMenu,
  getMenu,
  getAllMenus,
  deleteMenu,
  updateMenu,
} = require('./menu.controller');

const router = express.Router();

router.post('/', createMenu);
router.get('/', Pagination, getAllMenus);
router.get('/:menuId', getMenu);
router.delete('/:menuId', deleteMenu);
router.patch('/:menuId', updateMenu);

module.exports = router;
