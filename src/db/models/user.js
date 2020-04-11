const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: [
      {
        validator: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/,
        msg: "A valid email address is required",
      },
      {
        validator: (val) => !!val,
        msg: "An email address is required",
      },
    ],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  subreddits: [String],
});

module.exports = {
  Model: mongoose.model("User", userSchema, "user"),
  schema: userSchema,
};
