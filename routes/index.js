const express = require ("express")
const userRouter = require ("./user.js")
const Routes = express.Router ()


Routes.use ("/user",userRouter)

module.exports = Routes;