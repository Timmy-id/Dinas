const multer = require('multer');
const { AppError } = require('./index');

const storage = multer.diskStorage({
  filename: (_req, file, callback) => {
    callback(null, `${file.fieldname}${Date.now()}`);
  },
});

const fileFilter = (_req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    return callback(null, true);
  } else {
    return callback(
      new AppError(
        400,
        'Invalid image file. Image should be of type jpg, jpeg or png',
      ),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
