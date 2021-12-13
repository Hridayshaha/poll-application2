const Poll = require("../models/Poll");

const getCreateRoute = (_req, res) => {
  res.render("createPoll");
};

const postCreateRoute = async (req, res) => {
  let { title, description, options } = req.body;

  options = options.map((opt) => {
    return {
      name: opt || "",
      vote: 0,
    };
  });

  if (
    typeof title === "string" &&
    title.length > 0 &&
    typeof description === "string" &&
    description.length > 0 &&
    Object.keys(options).length >= 2
  ) {
    console.log("Yes");
    try {
      const poll = await new Poll({ title, description, options });
      poll
        .save()
        .then(() => {
          res.redirect("/polls");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  } else {
    console.log("No");
  }
};

const getAllPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find();
    res.render("polls", { polls });
  } catch (err) {
    console.log(err);
  }
};

const getSinglePoll = async (req, res, next) => {
  try {
    const id = req.params.id;
    const poll = await Poll.findById(id);

    let options = [...poll.options];
    let result = [];

    options.forEach((o) => {
      let percentage = (o.vote * 100) / poll.totalVote;

      result.push({
        ...o._doc,
        percentage: percentage ? percentage : 0,
      });
    });

    res.render("singlePoll", { poll, result });
  } catch (err) {
    console.log(err);
  }
};

const postSinglePoll = async (req, res, next) => {
  const id = req.params.id;
  const optionId = req.body.option;

  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];

    let index = options.findIndex((o) => o.id === optionId);

    options[index].vote = options[index].vote + 1;

    let totalVote = poll.totalVote + 1;

    await Poll.findOneAndUpdate({ _id: id }, { $set: { options, totalVote } });

    res.redirect("/polls/" + id);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getCreateRoute,
  postCreateRoute,
  getAllPolls,
  getSinglePoll,
  postSinglePoll,
};
