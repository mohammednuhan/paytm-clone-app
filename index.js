const express = require('express');
const mongoose = require ('mongoose')
const mainRouter = require ("./routes/index.js")
const cors = require ("cors")
const account = require ("./backend/routes/account.js")
const bodyParser = require('body-parser');


const app = express ()

mongoose.connect("mongodb://127.0.0.1:27017/paytm");


app.use(express.json())
app.use (cors());
app.use ("api/v1",mainRouter)
app.use ("api/v1/account",mainRouter)


app.listen(3000);