// Require All Modules
const express = require("express");
const morgan = require("morgan");

// Global Middleware Config
const globalMiddlware = [
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
];

// Module Export
module.exports = globalMiddlware;
