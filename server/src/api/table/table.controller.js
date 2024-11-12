const { Table, Menu, User } = require('../../../db/models');
const { AppError, generateQRCode, UploadToCloudinary } = require('../../utils');

const createTable = async (req, res, next) => {
  const { tableNumber } = req.body;
  const userId = req.userId;
  try {
    const table = await Table.findOne({
      where: { tableNumber, userId },
    });

    if (table) {
      throw new AppError(
        409,
        `Table with table number ${tableNumber} already exist`,
      );
    }

    const newTable = await Table.create({ tableNumber, userId });

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
  const userId = req.userId;

  try {
    const table = await Table.findOne({
      where: { id: tableId, userId },
    });

    if (!table) {
      throw new AppError(404, `Table with id ${tableId} not found`);
    }

    if (table.qrCodeUrl) {
      throw new AppError(
        409,
        `QR code already exist fot table number ${table.tableNumber}`,
      );
    }

    const qrCodeUrl = await generateQRCode(table.id);
    table.qrCodeUrl = qrCodeUrl;
    await table.save();

    res.status(201).json({
      status: 'success',
      message: `QR code generated for table number ${table.tableNumber} successfully.`,
      table,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllTables = async (req, res, next) => {
  try {
    const { limit, offset, page } = req.pagination;
    const userId = req.userId;
    const { count, rows: tables } = await Table.findAndCountAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'restaurantName'],
        },
      ],
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: 'success',
      message: 'All tables retrieved successfully',
      data: tables,
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

const getAllMenusForTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const userId = req.userId;

    const table = await Table.findOne({
      where: { id: tableId, userId },
      include: [
        {
          model: Menu,
          as: 'menus',
          attributes: [
            'id',
            'name',
            'price',
            'imageUrl',
            'description',
            'isAvailable',
          ],
        },
      ],
    });

    if (!table) {
      throw new AppError(404, 'Table not found');
    }

    res.status(200).json({
      status: 'success',
      message: `All Menus for table ${tableId} retrieved successfully`,
      data: table,
    });
  } catch (error) {
    return next(error);
  }
};

const getSingleTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const userId = req.userId;

    const table = await Table.findOne({
      where: { id: tableId, userId },
    });

    if (!table) {
      throw new AppError(404, 'Table not found');
    }

    res.status(200).json({
      status: 'success',
      message: `Table with ID ${tableId} retrieved successfully`,
      data: table,
    });
  } catch (error) {
    return next(error);
  }
};

const addMenuToTable = async (req, res, next) => {
  const { tableId } = req.params;
  const userId = req.userId;
  const file = req.file;
  let imageUrl = null;

  try {
    const table = await Table.findOne({ where: { id: tableId } });

    if (!table) {
      throw new AppError(404, `Table with id ${tableId} not found`);
    }

    if (file) {
      const path = file.path;
      const result = await UploadToCloudinary(path, 'Dinas_Menus');
      imageUrl = result.url;
    }

    const menu = await Menu.create({ ...req.body, imageUrl, userId, tableId });

    return res.status(201).json({
      status: 'success',
      message: 'Menu added to table successfully.',
      data: menu,
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
  getSingleTable,
  getAllMenusForTable,
};
