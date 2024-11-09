const { Menu } = require('../../../db/models');
const { AppError } = require('../../utils');

const createMenu = async (req, res, next) => {
  try {
    const newMenu = await Menu.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Menu created successfully.',
      data: newMenu,
    });
  } catch (error) {
    return next(error);
  }
};

const getMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new AppError(404, 'Menu not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Menu retrieved successfully.',
      data: menu,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllMenus = async (req, res, next) => {
  try {
    const { limit, offset, page } = req.pagination;
    const { count, rows: menus } = await Menu.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: 'success',
      message: 'All menus retrieved successfully.',
      data: menus,
      meta: {
        totalItems: count,
        currentPage: page,
        totalPages,
        pageSize: limit,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new AppError(404, 'Menu not found');
    }

    await menu.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Menu deleted successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new AppError(404, 'Menu not found');
    }

    await menu.update(req.body);
    await menu.save();

    res.status(200).json({
      status: 'success',
      message: 'Menu retrieved successfully.',
      data: menu,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMenu, getMenu, getAllMenus, deleteMenu, updateMenu };
