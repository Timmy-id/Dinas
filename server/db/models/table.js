/* eslint-disable no-undef */
'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'table',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    tableNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    qrCodeUrl: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    modelName: 'table',
  },
);
