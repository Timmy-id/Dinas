/* eslint-disable no-undef */
'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'menu',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    modelName: 'menu',
  },
);
