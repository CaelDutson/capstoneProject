const jwt = require("jsonwebtoken")
const privateKey = "chainsaw"

exports.generateToken = (user) => {
    try {
        let token = jwt.sign({ user: user }, privateKey);

        return token
    } catch (err) {
        return -1
    }
}  

exports.verifyToken = (token) => {
    try {
        const result = jwt.verify(
            token.substring(7),
            privateKey
        )

        return result
    } catch (err) {
        return -1
    }
}

// needs to be { Authorization: `Bearer ${token}` }