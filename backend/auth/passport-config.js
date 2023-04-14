const LocalStrategy = require('passport-local').Strategy
const hashOptions = require('./hashOptions.js')

function initialize(passport, getUser) {
    const authenticate = async (email, password, done) => {
        const user = await db.getUser(email);

        if (!user) {
            return done (null, false, { message: "Invalid email" })
        }

        try {
            if (await hashOptions.comaparePassword(password, user.password)) {
                return done(null, done)
            } else {
                return done(null, false, { message: 'Password Incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticate))
}

module.exports = initialize