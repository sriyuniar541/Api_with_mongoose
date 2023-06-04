module.exports = (app) => {
  const products = require("../controllers/product.controller");
  const router = require("express").Router();
  const upload = require("../middleware/upload");

  router.get("/", products.findAll);
  router.get("/:id", products.findOne);
  // router.post("/", upload.single("photo"), products.create); //uploas singgle photo
  router.post("/", upload.array("photo[]"), products.create); //uploas banyak photo
  router.put("/:id", products.update);
  router.delete("/:id", products.delete);

  app.use("/api/products", router);
};
