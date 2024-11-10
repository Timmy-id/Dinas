const fs = require('fs');
const cloudinary = require('./cloudinary.utils');

async function UploadToCloudinary(path, folderName) {
  const image = await cloudinary.uploader.upload(path, { folder: folderName });
  fs.unlinkSync(path);

  return { url: image.secure_url };
}

module.exports = { UploadToCloudinary };
