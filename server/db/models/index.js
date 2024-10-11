/* eslint-disable no-undef */
const Menu = require('./menu');
const Restaurant = require('./restaurant');
const Table = require('./table');
const User = require('./user');

Table.belongsToMany(Menu, {
  as: 'Menu',
  through: 'table_menu',
  foreignKey: 'table_id',
  timestamps: false,
});
Menu.belongsToMany(Table, {
  as: 'Table',
  through: 'table_menu',
  foreignKey: 'menu_id',
  timestamps: false,
});

module.exports = { Menu, Restaurant, Table, User };
