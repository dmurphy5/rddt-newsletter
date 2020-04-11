const request = require("superagent");
const sgMail = require("@sendgrid/mail");
const config = require("config");
const schedule = require("node-schedule");

const User = require("../db/models/user");
const createTemplate = require("./template");

async function getUserFeedData(user) {
  const feed = await Promise.all(user.subreddits.map(fetchTopPosts));

  return {
    ...user,
    feed,
  };
}

async function fetchTopPosts(subreddit) {
  const { body } = await request.get(
    `http://reddit.com/r/${subreddit}.json?limit=3&sort=top`
  );
  const filterStickied = (c) => !c.data.stickied;
  const topPosts = body.data.children.filter(filterStickied);
  const [topPost] = topPosts;

  return {
    subreddit: topPost.data.subreddit,
    url: `https://www.reddit.com/${topPost.data.subreddit_name_prefixed}/top`,
    posts: topPosts,
  };
}

async function getFeeds() {
  const userDocs = await User.Model.find({ active: true });
  const users = userDocs
    .map((d) => d.toObject())
    .filter((u) => !!u.subreddits.length);

  const userFeeds = await Promise.all(users.map(getUserFeedData));

  return userFeeds;
}

async function sendFeeds() {
  const feeds = await getFeeds();
  const { apiKey } = config.get("sendgrid");
  sgMail.setApiKey(apiKey);

  try {
    await Promise.all(
      feeds.map((feed) => {
        const msg = {
          to: feed.email,
          from: "xdylanmurphyx@gmail.com",
          subject: "Sending with Twilio SendGrid is Fun",
          text: "and easy to do anywhere, even with Node.js",
          html: createTemplate(feed.feed),
        };

        return sgMail.send(msg);
      })
    );
  } catch (e) {
    console.log(e);
    debugger;
  }
}

function startJob() {
  return schedule.scheduleJob("0 8 * * *", sendFeeds);
}

module.exports = { getFeeds, getUserFeedData, sendFeeds, startJob };
