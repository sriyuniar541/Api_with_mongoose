const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload");

module.exports = (app) => {
  router.post("/register", upload.single("photo"), userController.register);
  router.post("/login", upload.single("photo"), userController.login);

  app.use("/api/users", router);
};
