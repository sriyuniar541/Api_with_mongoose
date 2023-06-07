const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const joi = require("joi");
const validate_register = require("../helper/validation");
const Users = db.users;

exports.register = (req, res) => {
  bycript.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }

    //validasi register
    const { error } = validate_register(req.body);
    if (error) {
      return res.status(400).send({
        message: "error validation",
        error: error.message,
      });
    }

    const { name, email, phone_number, address } = req.body;

    let users = new Users({
      name,
      email,
      password: hashedPass,
      confir_password: hashedPass,
      phone_number,
      address,
    });

    if (req.file) {
      users.photo = req.file.path;
    }

    Users.findOne({ $or: [{ email: users.email }] })
      .then((user) => {
        if (!user) {
          users.save();
          res.send({
            message: "User added successfully",
          });
        } else {
          res.status(400).send({
            message: "Email alredy register!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Email alredy register!",
        });
        console.log(err);
      });
  });
};

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Users.findOne({ $or: [{ email: email }, { phone_number: email }] })
    .then((user) => {
      if (user) {
        bycript.compare(password, user.password, function (err, result) {
          if (result) {
            let token = jwt.sign({ name: user.name }, "jwt_token", {
              expiresIn: "1h",
            });
            res.send({
              message: "Login successfully",
              token: token,
            });
          } else {
            res.status(400).send({
              message: " Wrong password ",
            });
          }
        });
      } else {
        res.status(400).send({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error while login!",
      });
    });
};
