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
    },
    qrCodeUrl: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    modelName: 'table',
  },
);
