// Dotenv Configuration
require("dotenv").config("../.env");

// Require All Modules
const express = require("express");
const route = require("./route");
const { error404, globalErrorHandler } = require("./error");
const middle = require("./middleware");

// App Initialization
const app = express();

// View Engine
app.set("view engine", "ejs");

// Static Files
app.use(express.static(__dirname + "/public"));

// Global MiddleWares
app.use(middle);

// Routes Setup
app.use(route);

// Global Error Handing
app.use(error404);
app.use(globalErrorHandler);

module.exports = app;
