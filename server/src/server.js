const http = require('http');
const App = require('./app');
const { logger } = require('./utils');
const sequelize = require('../config/database');

const initializeApp = async () => {
  const app = await App();
  const server = http.createServer(app);
  const port = 3000;

  (async () => {
    try {
      await sequelize.sync();
      logger.info('============================');
      logger.info('Database is functioning');
      logger.info('============================');
    } catch (error) {
      logger.error(`${error}`);
    }
  })();

  server.listen(port, () => {
    logger.info('============================');
    logger.info(`App listening on port ${port}`);
    logger.info('============================');
  });
};

initializeApp();
