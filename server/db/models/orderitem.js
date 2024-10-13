/* eslint-disable no-undef */
'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'orderItem',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    orderId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    menuId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'menu',
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    modelName: 'orderItem',
  },
);
