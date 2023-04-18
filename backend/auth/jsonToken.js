const jwt = require("jsonwebtoken"); 
require('dotenv').config()

exports.generateToken = (user) => {
    try {
        console.log(user)
        let token = jwt.sign(
            { user: user }, 
            process.env.SECRET
        );
        console.log(token)
        return token
    } catch (err) {
        return -1
    }
}  

exports.verifyToken = (token) => {
    return jwt.verify(
        token.substring(7),
        process.env.SECRET
    )
}

// needs to be { Authorization: `Bearer ${token}` }