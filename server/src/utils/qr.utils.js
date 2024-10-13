const QRCode = require('qrcode');
const { logger } = require('./logger.utils');

const generateQRCode = async (tableId) => {
  const url = `http://localhost:3000/api/v1/orders/${tableId}`;

  try {
    const qrCodeUrl = await QRCode.toDataURL(url);
    return qrCodeUrl;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = generateQRCode;
