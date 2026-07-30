const SECRET_KEY = "your_secret_key"
const jwt = require ("jsonwebtoken")

function authmiddleware (req ,res, next ) {
    const token = req.headers.authorization

    if(!token){
        return res.status(403).json ({
        message : "token is missing"
        })
    }


    const decoded = jwt.verify(token,SECRET_KEY)
    const userid  = decoded.userid 

    if (!userid){
        return res.status (403).json ({
        message : ("invalid token")
        })
    }

    req.userid = userid ;

    next();
}

module.exports = {
    authmiddleware
};