const secret_key = require ("secret_key")
const jwt = require ("jsonwebtoken")

function authmiddleware(req,res,next ){
    const token = req.header

    if(!token){
        res.return.json(403)
        console.log("token is already taken")
    }

    const decoded = jwt.verify(token,"secret_key")
    const username  = decoded.user._id 

    if (!username){
        res.return.json (403)
        console.log ("username already there")
    }

    req.userid= user._id

    next()
}

module.exports(
    authmiddleware
)
