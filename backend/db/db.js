const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgress@localhost:5432/myDB'
}

const pool = new Pool(dbURL);

pool.connect();

exports.getUsers = (req, res) => {
    pool.query('SELECT * from students', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
    })
}

// columns are: username, hash (password), email, 
// isAdmin, firstName, lastName, and telephone
// Just test username, hash, and email for the mean time
exports.register = (info) => {
    pool.query(`INSERT INTO "students" ("username", "hash", "email") VALUES ($1, $2, $3)`, [info.username, info.password, info.email], (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
    })
}

// functions needed in the future are:
// getUsersFromCourse
// getCoursesFromUser
// availableCourses