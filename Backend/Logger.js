const path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const LogEntry = async (message) => {
  try {
    let date = format(new Date(), "yyyy-MM-dd \t HH:mm:ss");
    let logData = `${date}\t ${uuid()}\t ${message}`;
    if (!fs.existsSync(path.join(__dirname, "./Logs"))) {
      fs.mkdirSync(path.join(__dirname, "./Logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "./Logs/log.txt"),
      logData + "\n"
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = LogEntry;
