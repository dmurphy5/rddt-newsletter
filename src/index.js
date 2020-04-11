const express = require("express");
const bodyParser = require("body-parser");

const connect = require("./db");
const routes = require("./routes");
const { startJob } = require("./newsletter/job");

const app = express();

app.use(bodyParser.json());
app.use("/api", routes);

app.get("/alive.txt", (req, res) => {
  res.send("ok");
});

connect();
(async function __main__() {
  const port = process.env.NODE_PORT || 7000;
  await app.listen(port);
  const job = startJob();
  console.log(`listening at ${port}`);
})();
