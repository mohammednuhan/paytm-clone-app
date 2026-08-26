const express = require('express');
require ('./mongoose.js')
const mainRouter = require ("./routes/index.js")
const cors = require ("cors")

const app = express ()


console.log(mainRouter);
console.log(typeof mainRouter);

app.use(express.json())
app.use (cors());
app.use ("/api/v1",mainRouter)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});