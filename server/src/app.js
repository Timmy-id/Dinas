const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { NotFoundError, ErrorHandler } = require('./middlewares');
const menuRoutes = require('./api/menu');
const tableRoutes = require('./api/table');
const authRoutes = require('./api/auth');
const orderRoutes = require('./api/order');

const App = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
  app.use(cookieParser());

  app.use('/api/v1/menus', menuRoutes);
  app.use('/api/v1/tables', tableRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/orders', orderRoutes);

  app.all('*', NotFoundError);
  app.use(ErrorHandler);

  return app;
};

module.exports = App;
