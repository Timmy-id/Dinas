/* eslint-disable no-undef */
'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'order',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    tableId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'table',
        key: 'id',
      },
    },
    status: {
      type: Sequelize.ENUM('pending', 'preparing', 'served'),
      defaultValue: 'pending',
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    modelName: 'order',
  },
);
