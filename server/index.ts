const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const auth = require("./routes/auth");
const cors = require("./middlewares/cors");

const app = express();
const PORT = config.get("serverPort");

app.use(cors);
app.use(express.json());
app.use("/api/auth", auth);

const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl"));
    app.listen(PORT, () => console.log(`Started on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

export {};
start();
