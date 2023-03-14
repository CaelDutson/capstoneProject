let bcrypt = require('bcrypt')

exports.encrypt = (password) => {
    const token = bcrypt.hash(password, 11)

    return token
}

exports.comparePassword = (plaintextPassword, hash) => {
    bcrypt.compare(plaintextPassword, hash, (err, res) => {
        if (err) throw err;
        return res
    })
}