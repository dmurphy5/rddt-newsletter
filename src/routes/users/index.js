const { Router } = require("express");

const User = require("../../db/models/user");

const router = Router();

router.get("/", async (req, res, next) => {
  const docs = await User.Model.find({});

  res.send(docs.map((d) => d.toJSON()));
});

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  const [doc] = await User.Model.find({ email });

  res.send(doc.toJSON());
});

router.post("/:email", async (req, res, next) => {
  const { email } = req.params;
  const { subreddits = [] } = req.body;
  const doc = await User.Model.create({
    email,
    subreddits,
  });

  res.send(doc.toJSON());
});

router.post("/:email/subreddits", async (req, res, next) => {
  const { email } = req.params;
  const { subreddits } = req.body;
  const doc = await User.Model.findOneAndUpdate(
    { email },
    { subreddits },
    { new: true }
  );

  res.send(doc.toJSON());
});

router.patch("/:email/subreddits/add", async (req, res, next) => {
  const { email } = req.params;
  const user = await findUser(req);
  const { subreddits } = req.body;
  const newSubreddits = [...user.subreddits, ...subreddits];

  const doc = await User.Model.findOneAndUpdate(
    { email },
    { subreddits: newSubreddits },
    { new: true }
  );

  res.send(doc.toJSON());
});

router.patch("/:email/subreddits/remove", async (req, res, next) => {
  const { email } = req.params;
  const { subreddits } = req.body;

  const user = await findUser(req);
  const newSubreddits = user.subreddits.filter(
    (sr) => !subreddits.includes(sr)
  );

  const doc = await User.Model.findOneAndUpdate(
    { email },
    { subreddits: newSubreddits },
    { new: true }
  );

  res.send(doc.toJSON());
});

router.post("/:email/subscribe", async (req, res, next) => {
  const { email } = req.params;
  const doc = await User.Model.findOneAndUpdate(
    { email },
    { active: true },
    { new: true }
  );

  res.send({
    message: "Successfully subscribed to daily email newsletters",
    data: doc.toJSON(),
  });
});

router.post("/:email/unsubscribe", async (req, res, next) => {
  const { email } = req.params;

  const doc = await User.Model.findOneAndUpdate(
    { email },
    { active: false },
    { new: true }
  );

  res.send({
    message: "Successfully unsubscribed fom daily email newsletters",
    data: doc.toJSON(),
  });
});

router.delete("/:email", async (req, res, next) => {
  const { email } = req.params;
  await User.Model.findOneAndDelete({ email });

  res.send({ message: `Sucessfully removed ${email}` });
});

async function findUser(req) {
  const { email } = req.params;
  const [doc] = await User.Model.find({ email });

  return doc.toJSON();
}

module.exports = router;
