const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg, jpeg and png supported");
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
