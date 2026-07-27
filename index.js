const express = require('express');
const mongoose = require ('mongoose')

const app = express ()

app.use(express.json());


async function mongodb() {
    await mongoose.connect("mongodb://127.0.0.1:27017/paytm")
}
mongodb()

console.log("running")

app.listen(3000);