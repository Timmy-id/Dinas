/* eslint-disable no-undef */
'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your username',
        },
      },
    },
    restaurantName: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the name of your restaurant',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'Admin',
    },
    getUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return {
          id: this.id,
          username: this.username,
          email: this.email,
          restaurantName: this.restaurantName,
          phone: this.phone,
        };
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    modelName: 'user',
  },
);
