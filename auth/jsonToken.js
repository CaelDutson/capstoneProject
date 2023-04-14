const jwt = require("jsonwebtoken"); 
require('dotenv').config()

exports.generateToken = (user) => {
    try {
        console.log(user)
        let token = jwt.sign(
            { user: user }, 
            process.env.SECRET
        );

        return token
    } catch (err) {
        return -1
    }
}  

exports.verifyToken = (token) => {
    try {
        const result = jwt.verify(
            token.substring(7),
            process.env.SECRET
        )

        return result
    } catch (err) {
        return -1
    }
}

// needs to be { Authorization: `Bearer ${token}` }