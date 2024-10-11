const { Table, Menu } = require('../../../db/models');
const { AppError } = require('../../utils');

const createTable = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newTable = await Table.create({ name });

    res.status(201).json({
      status: 'success',
      message: 'Table created successfully.',
      data: newTable,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.findAll({});

    res.status(200).json({
      status: 'success',
      message: 'All tables retrieved successfullys',
      data: tables,
    });
  } catch (error) {
    return next(error);
  }
};

const addMenuToTable = async (req, res, next) => {
  const { name } = req.body;
  const { menuId } = req.params;
  try {
    const menu = await Menu.findOne({ where: { id: menuId } });

    if (!menu) {
      throw new AppError(404, `Menu with id ${menuId} not found`);
    }

    const newTable = await Table.create({ name });
    newTable.addMenu(menu);

    const table = await Table.findByPk(newTable.id);

    const data = await table.getMenu();

    return res.status(201).json({
      status: 'success',
      message: 'Table created successfully.',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createTable, getAllTables, addMenuToTable };
