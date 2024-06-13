const multer = require('multer');
const SharpMulter = require('sharp-multer');
const path = require('path');

const image = SharpMulter({
    destination: function (req, file, cb) {
        cb(null, path.join('src/uploads', 'image'));
    },
    imageOptions: {
        fileFormat: "png",
        quality: 50,
        resize: { width: 500, height: 900 },
    },
    useTimestamp: true,
    filename: (originalname, options, req) => {
        const uniqueId = Date.now().toString();
        const { fileFormat , resize } = options;
        return `image-${uniqueId}-${resize.width}x${resize.height}.${fileFormat}`;
    },
});

const imageUpload = multer({ storage: image });

module.exports = { imageUpload };