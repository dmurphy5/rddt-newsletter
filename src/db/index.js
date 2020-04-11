const config = require("config");
const mongoose = require("mongoose");

const { uri } = config.get("db");

function connect() {
  mongoose.connect(uri, { useNewUrlParser: true });
}

module.exports = connect;
