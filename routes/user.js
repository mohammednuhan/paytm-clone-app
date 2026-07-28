const express = require ("express")
const z = require ("zod")
const jwt = require ("jsonwebtoken")
const db =require ("./mongoose.js")
const bcrypt = require ("brcypt");
const authmiddleware = require("../authmiddleware.js");
const Router = require(".");
const Routes = express.Router ()

const userSchema = z.object ({
     username : z.string(),
     firstName : z.string(),
     lastname : z.string(),
     password : z.string()

})

Routes.post("/signup",authmiddleware, async (req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const userExist = await db.user.findOne ({username : username})

    if(userExist){
        console.log("user already existed")
    }
    else {
        console.log ("user created")
    }  

    await db.user.insertOne ({
        username,
        firstName : firstName,
        lastname,
        password,
    })

    res.json({
        message: "user created"
    })
})

Routes.post("/signin",authmiddleware,async(res,req)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExist = db.user.findOne ({username : username , password : password })

    if(userExist) {
        console.log ("user already logged")
    }

    const jwt = jwt.token ({
        userid : userExist._id  
    },SECRET_KEY )

    return res.status(203).json({
        message : "user logged" 
    })
})


const updatebody = z.object ({
    firstName : z.string().optional(),
    lastname : z.string().optional(),
    password : z.string().optional()

})
 
Router.put("/",authmiddleware,async(req,res)=>{
    const result = updatebody.safeParse(req.body)
    
    if (!result.success){
        return res.status (403).json({
            message : "invalid input"
        })
    }

    await db.user.updateOne({
        id : req.userid
    })

    res.json (
        console.log ("user update ")
    )
})
module.exports = Routes;