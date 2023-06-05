const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const Users = db.users;

exports.register = (req, res) => {
  bycript.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let users = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      phone_number: req.body.phone_number,
      alamat: req.body.alamat,
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
