/* eslint-disable no-undef */
const Menu = require('./menu');
const Restaurant = require('./restaurant');
const Table = require('./table');
const User = require('./user');
const Order = require('./order');
const OrderItem = require('./orderitem');

Table.hasMany(Order, { foreignKey: 'tableId' });
Menu.hasMany(OrderItem, { foreignKey: 'menuId' });
Order.belongsTo(Table, { foreignKey: 'tableId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Menu, { foreignKey: 'menuId' });

module.exports = { Menu, Restaurant, Table, User, Order, OrderItem };
