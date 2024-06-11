const multer = require('multer');
const SharpMulter = require('sharp-multer');

const storage = SharpMulter({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (originalname, options) => {
    const name = originalname.split(' ').join('_');
    return name + Date.now() + '.webp';
  },
  imageOptions: {
    fileFormat: 'webp',
    quality: 80,
    resize: { height: 360 },
  }
});

module.exports = multer({ storage }).single('image');