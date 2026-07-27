const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/patym")

const userSchema = new mongoose.Schema({
    username : String,
    firstName :String,
    lastname : String,
    password: String
});

const User = mongoose.model
            ("User", userSchema);

    module.exports = User;