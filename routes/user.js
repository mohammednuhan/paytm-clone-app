const express = require ("express")
const z = require ("zod")
const jwt = require ("jsonwebtoken")

const Routes = express.Router ()
 
app.use ("/api/user",userRouter)

const userSchema = z.object ({
     username : z.string,
     firstName : z.string,
     lastname : z.string,
     password : z.string

})

Routes.post ("/signup",async(req,res) => {
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
})

await db.user.insertOne ({
    username : String,
    firstName : String,
    lastname : String,
    password : String,
})


Routes.post("/signin",(res,req)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExist = db.user.findOne ({username : username , password : password })

    if(userExist) {
        console.log ("user already logged")
    }

    const jwt = jwt.token ({
        username  
    },secret_key )

    res.return(203).json({
        message : "user logged" 
    })
})


module.exports = Routes;