const { Schema, model } = require("mongoose");

const pollSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalVote: {
    type: Number,
    default: 0,
  },
  options: [
    {
      name: String,
      vote: Number,
    },
  ],
});

const Poll = new model("Poll", pollSchema);

module.exports = Poll;
