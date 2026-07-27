const express = require('express');
const mongoose = require ('mongoose')
const mainRouter = require ("./routes/index.js")

const app = express ()
app.use = ("api/v1",mainRouter)

async function mongodb() {
    await mongoose.connect("mongodb://localhost:27017/patym")
}
mongodb()

console.log("running")

app.listen(3000);