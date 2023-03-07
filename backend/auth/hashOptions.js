let bcrypt = require('bcryptjs')

exports.encrypt = (password) => {
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) throw err;
        console.log(hash)
    })
}

// exports.decrypt =