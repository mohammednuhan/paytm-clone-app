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

const accountSchema = new mongoose.Schema ({
    Usersid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users",
    reqiured : true
    },
    balance : {
        type : Number ,
        reqiured : true 
        
    }
});

const User = mongoose.model
            ("User", userSchema);

const balance = mongoose.model 
                ("account",accountSchema)

module.exports =
    User,account;
