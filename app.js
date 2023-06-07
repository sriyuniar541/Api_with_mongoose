const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
require("dotenv").config()

const db = require("./app/models/index");
const { config } = require("dotenv");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify : true //untuk mengizinkan adanya perubahan pada database
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err.message);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json("Welcome to API with mongooDB");
});

require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);

app.use("/*", (req, res) => {
  res.json("Page not found..! ");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
