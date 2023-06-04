const db = require("../models/index");
const Products = db.products;

//get All data
exports.findAll = (req, res) => {
  Products.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving products.",
      });
    });
};

// insert data
exports.create = (req, res) => {
  const products = new Products({
    name: req.body.name,
    price: req.body.price,
  });

  products
    .save(products)
    .then((result) => {
      res.send(result);
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
      res.send(result);
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
