const express = require("express");
const userRouter = require("./user.js");
const accountRouter = require("./account.js");

const Router = express.Router();

Router.use("/user", userRouter);
Router.use("/account", accountRouter);

module.exports = Router;