const SECRET_KEY = "your_secret_key"
const jwt = require ("jsonwebtoken")

function authmiddleware(req,res,next ){
    const token = req.headers.authorization

    if(!token){
        return res.status(403).json
        console.log("token is missing")
    }

    const decoded = jwt.verify(token,SECRET_KEY)
    const username  = decoded.userid 

    if (!username){
        return res.status (403).json 
        console.log ("invalid token")
    }

    req.userid= userid

    next()
}

module.exports =
    authmiddleware
