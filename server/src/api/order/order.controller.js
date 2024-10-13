const { Order, OrderItem, Table, Menu } = require('../../../db/models');
const { AppError } = require('../../utils');

const createOrder = async (req, res, next) => {
  const { tableId } = req.params;
  const { items } = req.body;
  try {
    const tableExist = await Table.findByPk(tableId);

    if (!tableExist) {
      throw new AppError(404, `Table with id ${tableId} not found`);
    }

    if (!items || items.length === 0) {
      throw new AppError(400, 'Order items cannot be empty');
    }

    const newOrder = await Order.create({ tableId });

    await Promise.all(
      items.map((item) =>
        OrderItem.create({
          orderId: newOrder.id,
          menuId: item.menuId,
          quantity: item.quantity,
        }),
      ),
    );

    res.status(201).json({
      status: 'success',
      message: 'New order created successfully.',
      data: newOrder,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllOrdersForTable = async (req, res, next) => {
  const { tableId } = req.params;

  try {
    const table = await Table.findByPk(tableId);

    if (!table) {
      throw new AppError(404, `Table with id ${tableId} not found`);
    }

    const orders = await Order.findAll({
      where: { tableId },
      include: [{ model: OrderItem, include: [Menu] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(201).json({
      status: 'success',
      message: 'Table orders retrieved successfully.',
      data: orders,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createOrder, getAllOrdersForTable };
