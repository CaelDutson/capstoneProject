const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL || 'postgres://mmmm:9qGgjV51UGLWHntuEHagqS4d4th5AX09@dpg-cg0bq29mbg5ek4gj2qm0-a.oregon-postgres.render.com/dbstudents?ssl=true'
}

const pool = new Pool(dbURL);

pool.connect();

exports.getUsers = (req, res) => {
    pool.query('SELECT * from students', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        } 
        res.status(200).json(results.rows);
    })
}

// columns are: username, hash (password), email, 
// isAdmin, firstName, lastName, and telephone
// Just test username, hash, and email for the mean time
exports.register = (data) => {
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    let name = /^[a-zA-Z]+$/;
    if (email.test(data.body.email) && phone.test(data.body.telephone) && name.test(data.body.firstName) && name.test(data.body.lastName)) {
        pool.query(`insert into students (email, username, hash, firstname, lastname, telephone, address) values ('${data.body.email}', '${data.body.username}', '${data.body.password}', '${data.body.firstName}', '${data.body.lastName}', '${data.body.telephone}', '${data.body.address}')`, (err, results) => {  
            if(err) throw err;
            console.log(results)
        }) 
    } 
    else{ 
        return console.error('Either email, telephone, first and last name is not valid');
    }
} 

exports.adminLogin = async (username) => { 
    const results = await pool.query('SELECT * from users where username = $1', [username]) 
    console.log(results.rows[0]); 
    return results.rows[0];
} 

exports.getAdmin = async (data) => {
    const results = await pool.query(
    `SELECT * FROM students WHERE ("username" = $1) AND ("hash" = $2) AND ("isAdmin" = 'true')`, 
    [data.adminUserName, data.adminPassword]);

    return results.rows[0];
}

// functions needed in the future are:
// getUsersFromCourse
// getCoursesFromUser
// availableCourses