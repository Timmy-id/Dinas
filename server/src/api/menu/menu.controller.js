const { Menu } = require('../../../db/models');

const createMenu = async (req, res, next) => {
  const { name, price, quantity } = req.body;
  try {
    const newMenu = await Menu.create({
      name,
      price,
      quantity,
    });

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
