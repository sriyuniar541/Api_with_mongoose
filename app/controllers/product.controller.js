const validate_products = require("../helper/validation_products");
const db = require("../models/index");
const Products = db.products;

//get All data
exports.findAll = (req, res) => {
  Products.find()
    .then((result) => {
      res.send({
        message: "Get data success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving products.",
      });
    });
};

// insert data
exports.create = (req, res) => {
  
  //validasi data
  const { error } = validate_products(req.body);
  if (error) {
    return res.status(400).send({
      message: "error validation",
      error: error.message,
    });
  }

  let { name, price, count } = req.body;
  let products = new Products({
    name,
    price,
    count,
  });

  // insert singgle photo
  // if (req.file) {
  //   products.photo = req.file.path;
  // }

  //insert banyak photo
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    products.photo = path;
  }

  products
    .save(products)
    .then((result) => {
      res.send({
        message: "Insert data success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error while crete products.",
      });
    });
};

// get data by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Products.findById(id)
    .then((result) => {
      res.send({
        message: "Get data success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error while show products.",
      });
    });
};

//update data
exports.update = (req, res) => {
  const id = req.params.id;
  let { name, price, count } = req.body;
  let products = new Products({
    name,
    price,
    count,
  });

  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    products.photo = path;
  }

  Products.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found",
        });
      }
      res.send({
        message: "Product was update",
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error while update products.",
      });
    });
};

//delete data
exports.delete = (req, res) => {
  const id = req.params.id;

  Products.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Delete not found",
        });
      }
      res.send({
        message: "Product was delete",
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error while delete products.",
      });
    });
};
