// Dotenv Configuration
require("dotenv").config();

// Require All Modules
const http = require("http");
const mongoose = require("mongoose");

// Intialize Main App File
const app = require("./app/app");

// Server Config
const PORT = process.env.PORT || 8000;
const DB_CONNECT =
  process.env.DB_CONNECTION ||
  "mongodb+srv://hriday-poll:poll-application2@pollapplication.ngicw.mongodb.net/PollDatabase?retryWrites=true&w=majority";

// Server Configuration
const server = http.createServer(app);
mongoose
  .connect(DB_CONNECT)
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.log(err.message);
  });
