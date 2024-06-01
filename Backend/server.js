const express = require("express");
const mongoose = require("mongoose");
const server = express();
const bodyParse = require("body-parser");
const bodyParser = require("body-parser");
const Router = require("./Routes/routes");
const cors = require("cors");
const logEntry = require("./Logger");
require("dotenv").config();

const PORT = 3000;
server.use(cors());
server.use(bodyParser.json());
server.use((req, res, next) => {
  logEntry(`${req.method}\t${req.headers.origin}\t${req.url}`);

  next();
});
server.use("/Register", Router);
server.use("/Users", Router);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
