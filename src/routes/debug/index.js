const { Router } = require("express");

const router = Router();

const User = require("../../db/models/user");
const {
  getFeeds,
  sendFeeds,
  getUserFeedData,
} = require("../../newsletter/job");
const createTemplate = require("../../newsletter/template");

router.get("/", async (req, res, next) => {
  const data = await sendFeeds();
});

module.exports = router;
