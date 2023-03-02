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
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.test(data.body.email)) {
        pool.query(`insert into students (email, username, password) values ('${data.body.email}', '${data.body.username}', '${data.body.password}')`, (err, results) => {  
            if(err) throw err;
            console.log(results)
        }) 
    } 
    else{ 
        return console.error('Not valid email');
    }
}

// functions needed in the future are:
// getUsersFromCourse
// getCoursesFromUser
// availableCourses