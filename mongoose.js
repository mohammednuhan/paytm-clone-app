const mongoose = require("mongoose");

async function mongodb() {
    await mongoose.connect("mongodb://localhost:27017/patym")
}
mongodb()


const userSchema = new mongoose.Schema({
    username : String,
    firstName :String,
    lastname : String,
    password: String
});

const User = mongoose.model
            ("User", userSchema);

    module.exports = User;