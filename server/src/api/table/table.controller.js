const { Table, Menu } = require('../../../db/models');
const { AppError, generateQRCode } = require('../../utils');

const createTable = async (req, res, next) => {
  const { tableNumber } = req.body;
  try {
    const newTable = await Table.create({ tableNumber });

    res.status(201).json({
      status: 'success',
      message: 'Table created successfully.',
      data: newTable,
    });
  } catch (error) {
    return next(error);
  }
};

const generateQRForTable = async (req, res, next) => {
  const { tableId } = req.params;

  try {
    const table = await Table.findByPk(tableId);

    if (!table) {
      throw new AppError(404, `Table with id ${tableId} not found`);
    }

    const qrCodeUrl = await generateQRCode(table.id);
    table.qrCodeUrl = qrCodeUrl;
    await table.save();

    res.status(201).json({
      status: 'success',
      message: 'QR code generated for table successfully.',
      table,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllTables = async (_req, res, next) => {
  try {
    const tables = await Table.findAll({});

    res.status(200).json({
      status: 'success',
      message: 'All tables retrieved successfully',
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

module.exports = {
  createTable,
  getAllTables,
  generateQRForTable,
  addMenuToTable,
};
