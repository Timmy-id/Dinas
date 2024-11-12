/* eslint-disable no-undef */
const Menu = require('./menu');
const Table = require('./table');
const User = require('./user');
const Order = require('./order');
const OrderItem = require('./orderitem');

User.hasMany(Menu, { foreignKey: 'userId', as: 'menus' });
Menu.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Table, { foreignKey: 'userId', as: 'tables' });
Table.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Table.hasMany(Menu, { foreignKey: 'tableId', as: 'menus' });
Menu.belongsTo(Table, { foreignKey: 'tableId', as: 'table' });
Table.hasMany(Order, { foreignKey: 'tableId' });
Menu.hasMany(OrderItem, { foreignKey: 'menuId' });
Order.belongsTo(Table, { foreignKey: 'tableId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Menu, { foreignKey: 'menuId' });

module.exports = { Menu, Table, User, Order, OrderItem };
