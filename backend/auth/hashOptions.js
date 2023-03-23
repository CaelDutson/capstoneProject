let bcrypt = require('bcrypt')

exports.encrypt = (password) => {
    const token = bcrypt.hash(password, 11)

    return token
}

exports.comparePassword = async (plaintextPassword, hash) => {
    return await bcrypt.compare(plaintextPassword, hash)
}