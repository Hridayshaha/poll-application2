// Require All Modules
const route = require("express").Router();
const {
  getCreateRoute,
  postCreateRoute,
  getAllPolls,
  getSinglePoll,
  postSinglePoll,
} = require("../controller/controller");

// Router Setup
route.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Sucessful Request",
  });
});

route.post("/polls/:id", postSinglePoll);
route.get("/polls/:id", getSinglePoll);
route.get("/polls", getAllPolls);

route.post("/create", postCreateRoute);
route.get("/create", getCreateRoute);

route.get("/", (req, res) => {
  res.redirect("/create");
});

// Module Export
module.exports = route;
