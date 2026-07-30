const mongoose = require("mongoose");

async function mongodb() {
    await mongoose.connect("mongodb://localhost:27017/paytm")
}
mongodb();


const userSchema = new mongoose.Schema({
    username : String,
    firstName :String,
    lastName : String,
    password: String
});

const accountSchema = new mongoose.Schema ({
    usersid : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
    },
    balance : {
        type : Number ,
        required : true 
        
    }
});

const user = mongoose.model
            ("User", userSchema);

const account = mongoose.model 
                ("Account",accountSchema)

module.exports ={
    user,
    account
}