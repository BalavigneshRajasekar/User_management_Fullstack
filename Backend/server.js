const express = require("express");
const mongoose = require("mongoose");
const server = express();
const bodyParse = require("body-parser");
const bodyParser = require("body-parser");
const Router = require("./Routes/routes");
const cors = require("cors");
const logEntry = require("./Logger");

const PORT = 3000;
server.use(cors());
server.use(bodyParser.json());
server.use((req, res, next) => {
  logEntry(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
});
server.use("/Users", Router);

mongoose
  .connect(
    "mongodb+srv://vigneshvicky:MongoDB.1234@cluster0.lndirta.mongodb.net/user_data"
  )
  .then(() => {
    console.log("DB connected");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });