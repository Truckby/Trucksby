const multer = require('multer');

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'];
const MAX_FILE_SIZE_MB = 10;

// Keeps files in memory so they can be sent straight to S3
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      const error = new Error('Only JPG, PNG, WEBP, GIF or HEIC images are allowed');
      error.code = 400;
      return cb(error);
    }
    cb(null, true);
  },
});

// Turns multer errors into 400s with a readable message for the error handler
const handleErrors = (middleware) => (req, res, next) => {
  middleware(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      const error = new Error(
        err.code === 'LIMIT_FILE_SIZE'
          ? `Each image must be ${MAX_FILE_SIZE_MB} MB or smaller`
          : 'Too many images or unexpected file field'
      );
      error.code = 400;
      return next(error);
    }
    next(err);
  });
};

module.exports = {
  single: (field) => handleErrors(upload.single(field)),
  array: (field, maxCount) => handleErrors(upload.array(field, maxCount)),
};
