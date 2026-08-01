const express = require ("express")
const z = require ("zod")
const jwt = require ("jsonwebtoken")
const db = require("../mongoose.js");
const { authmiddleware } = require("../authmiddleware.js");
const Routes = express.Router ()
const SECRET_KEY="your_secret_key";

const userSchema = z.object ({
     username : z.string(),
     firstName : z.string(),
     lastName : z.string(),
     password : z.string()

})

Routes.post("/signup", async (req, res) => {

    const result = userSchema.safeParse (req.body);


    if (!result.success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const userExist = await db.user.findOne ({username : username})

    if(userExist){
        console.log("user already existed")
    }
    else {
        console.log ("user created")
    }  

    await db.user.create ({
        username,
        firstName : firstName,
        lastName,
        password,
    })

    res.json({
        message: "user created"
    })
})

Routes.post("/signin",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await db.user.findOne ({username : username , password : password })

    if(userExist) {
        console.log ("user already logged")
    }

    const token = jwt.sign
    ({
      userid : userExist._id  
    },SECRET_KEY )

    return res.status(200).json({
        message : "user logged" 
    })
})


const updatebody = z.object ({
    firstName : z.string().optional(),
    lastName : z.string().optional(),
    password : z.string().optional()

})
 
Routes.put("/",authmiddleware,async(req,res)=>{
    const result = updatebody.safeParse(req.body)
    
    if (!result.success){
        return res.status (403).json({
            message : "invalid input"
        })
    }

    await db.user.updateOne(
        { 
        _id : req.userid
    },{
        $set : req.body
    }
 )

    res.json ({
        message : "user update "
    })
})


Routes.get("/bulk", async (req, res) => {
    const filter = req.query.filter ||"";

    const users = await db.user.find({
        $or: [
            {
                firstName: {
                    $regex: filter
                }
            },
            {
                lastName: {
                    $regex: filter
                }
            }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        }))
    });
});


module.exports = Routes;