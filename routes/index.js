const express = require ("express")
const userRouter = require ("./user.js")
const Router = express.Router ()
const account = require ("account.js")

Router.use ("/user",userRouter)

module.exports = Router;