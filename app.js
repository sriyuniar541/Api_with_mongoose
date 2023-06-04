const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/index");
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

require('./app/routes/product.routes')(app)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
