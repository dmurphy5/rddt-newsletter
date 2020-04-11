const { Router } = require("express");

const debug = require("./debug");
const users = require("./users");

const router = Router();

router.use("/users", users);
router.use("/_debug", debug);

module.exports = router;
