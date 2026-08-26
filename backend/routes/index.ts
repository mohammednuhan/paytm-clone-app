import express from "express"
import userRouter from "./user.js";
const accountRouter = require("./account.js");

const Router = express.Router();

const app = express()
app.use (express.json())


Router.use("/user", userRouter);
Router.use("/account", accountRouter);


export default Router;