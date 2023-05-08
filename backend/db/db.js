const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL || 'postgres://mmmm:9qGgjV51UGLWHntuEHagqS4d4th5AX09@dpg-cg0bq29mbg5ek4gj2qm0-a.oregon-postgres.render.com/dbstudents?ssl=true'
}

const pool = new Pool(dbURL);

pool.connect();

exports.getUsers = async (req, res) => { 
    pool.query('SELECT * from students', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            //console.log(JSON.stringify(row));
        } 
        res.status(200).json(results.rows);
    })
}  

exports.getData = (req, res) => { 
    pool.query('SELECT * from classes', (err, results) => { 
        if (err) throw err; 
        for (let row of results.rows){ 
            console.log(JSON.stringify(row))
        } 
        res.status(200).json(results.rows)
    })
}

exports.getClasses = async (data) => {  
    console.log(data)
    const results = await pool.query('SELECT * FROM students WHERE (username = $1)', [(data.username)]); 
    console.log(results.rows); 
    return(results.rows);
}

exports.getInfo = async (username) => { 
    console.log(username)
    const results = await pool.query(`SELECT * FROM students WHERE firstname LIKE $1`, [`${username.userName}%`]) 
    console.log(results.rows); 
    return results.rows;
} 

exports.editUsers = async (data) => { 
    console.log(data); 
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    let name = /^[a-zA-Z]+$/; 
    await pool.query(`UPDATE students SET firstname='${data.firstname}', lastname='${data.lastname}', username='${data.username}', email='${data.email}', address='${data.address}', telephone='${data.telephone}' WHERE id=${data.id}`);   
    
} 

exports.deleteUser = async (data) => { 
    console.log('its working'); 
    console.log(data);
    if(data.id == null || undefined){
        return 'Nothing was selected'
    } 
    else{ 
        await pool.query(`DELETE FROM students WHERE id=${data.id}`); 
    }
}

exports.getInfo = async (username) => { 
    console.log(username)
    const results = await pool.query(`SELECT * FROM students WHERE firstname ILIKE $1 OR lastname ILIKE $1 OR username ILIKE $1 OR email ILIKE $1`, [`${username.userName}%`]); 
    console.log(results.rows); 
    return results.rows;
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
exports.register = (data) => {
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    let phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    let name = /^[a-zA-Z]+$/;
    if (email.test(data.body.email) && phone.test(data.body.telephone) && name.test(data.body.firstName) && name.test(data.body.lastName)) {
        pool.query(`insert into students (email, username, hash, firstname, lastname, telephone, address) values ('${data.body.email}', '${data.body.username}', '${data.body.password}', '${data.body.firstName}', '${data.body.lastName}', '${data.body.telephone}', '${data.body.address}')`, (err, results) => {  
            if(err) { 
                return console.error('Either email, telephone, first and last name is not valid or username and password already exist');
            }
            console.log(results);
        }) 
    } 
    else{ 
        return console.error('Either email, telephone, first and last name is not valid');
    }
} 

exports.login = async (data) => { 
    const results = await pool.query('SELECT * FROM students WHERE ("username" = $1) AND ("hash" = $2)', [data.username, data.password]) 
    console.log(results.rows[0]); 
    return results.rows[0];
} 

exports.getAdmin = async (data) => {
    const results = await pool.query(
        `SELECT * FROM students WHERE ("username" = $1)`, 
        [data.username]
    );

    return results.rows[0];
}

exports.getCourses = async (req, res) => {
    const results = await pool.query(`SELECT * from courses`);
    
    res.status(200).json(results.rows)
}

exports.getUser = async (data) => {
    const results = await pool.query(
        `SELECT * FROM students WHERE ("username" = $1)`, 
        [data.username]
    );

    return results.rows[0];
} 

exports.createChat = async (data) => { 
    const results = await pool.query(`INSERT INTO messages (sender_id, recipient_id) values ('${data.sender}', '${data.label}')`); 
    if(err){ 
        return(err)
    }
    console.log(results);
}

// Student class unregistering function
exports.unregister = async(req, res) => {

}

// functions needed in the future are:
// getUsersFromCourse
// getCoursesFromUser
// availableCourses