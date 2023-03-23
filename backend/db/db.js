const Pool = require('pg').Pool;
const hashOptions = require('../auth/hashOptions.js')

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

exports.getInfo = async (username) => { 
    console.log(username)
    const results = await pool.query(`SELECT * FROM students WHERE firstname LIKE $1`, [`${username.userName}%`]) 
    console.log(results.rows); 
    return results.rows;
} 

exports.editUsers = async (data) => { 
    console.log(data); 
    if (data.id == null || data.id == undefined ){ 
        return 'Nothing was selected'
    } 
    else{
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    let name = /^[a-zA-Z]+$/; 
    await pool.query(`UPDATE students SET firstname='${data.firstName}', lastname='${data.lastName}', username='${data.userName}', email='${data.email}', address='${data.address}', telephone='${data.telephone}' WHERE id=${data.id}`);   
    }
} 

exports.deleteUser = async (data) => { 
    console.log('its working'); 
    console.log(data) 
    if(data.id == null || undefined){
        return 'Nothing was selected'
    } 
    else{ 
        await pool.query(`DELETE FROM students WHERE id=${data.id}`); 
    }
}

// columns are: username, hash (password), email, 
// isAdmin, firstName, lastName, and telephone
// Just test username, hash, and email for the mean time
exports.register = async (req, res) => {
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    let name = /^[a-zA-Z]+$/;
    console.log(req.body.email)
    if (email.test(req.body.email) && phone.test(req.body.telephone) && name.test(req.body.firstName) && name.test(req.body.lastName)) {
        let hash = await hashOptions.encrypt(req.body.password);
        pool.query(`insert into students (email, username, hash, firstname, lastname, telephone, address) values ('${req.body.email}', '${req.body.username}', '${hash}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.telephone}', '${req.body.address}')`) 
            .then(_ => {
                res.status(200)
            })
            .catch(err => {
                res.status(500).json("username or email already in use!")
            })
    } else { 
        res.status(409).json('Either email, telephone, first and last name is not valid');
    }
} 

exports.adminLogin = async (username) => { 
    const results = await pool.query('SELECT * from users where username = $1', [username]) 
    console.log(results.rows[0]); 
    return results.rows[0];
} 

exports.getUser = async (data) => {
    const results = await pool.query(
        `SELECT * FROM students WHERE ("username" = $1)`, 
        [data.username]
    );

    return results.rows[0];
}

// functions needed in the future are:
// getUsersFromCourse
// getCoursesFromUser
// availableCourses