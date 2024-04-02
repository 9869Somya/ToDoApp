const express = require("express");
const mongoose = require("mongoose");
const allowCors = require("./cors");
const dotenv = require("dotenv");
const todoRouter = require("./todoRouter");
const app = express();
dotenv.config();

app.use(allowCors);
app.use(express.json());
app.use("/", todoRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected with database");
    app.listen(process.env.API_PORT, () => {
      console.log("Server started");
    });
  })
  .catch((error) => console.log(error.message));
