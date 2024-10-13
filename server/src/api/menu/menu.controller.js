const { Menu } = require('../../../db/models');

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

module.exports = { createMenu };
