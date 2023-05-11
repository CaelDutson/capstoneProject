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
    console.log(data.label[0].label)
    try {
      const results = await pool.query(
        `INSERT INTO chats (sender_id, recipient_id) VALUES ($1, $2) RETURNING id`,
        [data.sender, data.label[0].label]
      );
      const chatId = results.rows[0].id; // Retrieve the 'id' field from the returned row
      return chatId;
    } catch (error) {
      throw new Error('Failed to create chat');
    }
  };
  
  exports.deleteChat = async (data) => {
    console.log(data);
    const query = 'DELETE FROM chats WHERE sender_id = $1 AND recipient_id = $2';
    const values = [data.sender_id, data.recipient_id];
    const results = await pool.query(query, values);
    console.log(`Deleted rows with sender_id = ${data.sender_id} and recipient_id = ${data.recipient_id}`);
  };
  
  
  exports.getChat = async (data) => { 
    console.log(data);
    try {
      const results = await pool.query(
        `SELECT * FROM chats WHERE (sender_id = $1 OR recipient_id = $1)`,
        [data.name]
      ); 
      return results.rows;
    } catch (error) {
      throw new Error('Failed to get chats');
    }
  }; 

  exports.getMessages = async (data) => { 
    console.log(data)
    try {
        const results = await pool.query(
            `SELECT sender_id, timestamp, content FROM messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) ORDER BY timestamp ASC`,
            [data.sender, data.recipient]
        );           
          
      return results.rows;
    } catch (error) {
      throw new Error('Failed to get messages');
    }
  };
  
  exports.sendMessage = async (chatId, senderId, recipientId, content) => { 
    console.log(recipientId);
    try {
      const results = await pool.query(
        `INSERT INTO messages (chat_id, sender_id, recipient_id, content) VALUES ($1, $2, $3, $4) RETURNING *`,
        [chatId, senderId, recipientId, content]
      );
      return results.rows;
    } catch (error) {
      throw new Error('Failed to send message');
    }
  };
  
   
  
  


exports.classRegister = async (req, res) => {
    pool.query(
        `UPDATE courses
         SET student_ids = ARRAY_APPEND(student_ids, $1)
         WHERE id = $2`,
         [req.headers.user.id, req.headers.class_id], (err, _) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).send('Success')
            }
         }
    )
}

// Student class unregistering function
exports.classUnregister = async (req, res) => {
    pool.query(
        `UPDATE courses
         SET student_ids = array_remove(student_ids, $1)
         WHERE id = $2`,
         [req.headers.user.id, req.headers.class_id], (err, _) => {
            if (err) { 
                res.status(400).send(err)
            } else {
                res.status(200).send('Success')
            }   
        }
    )
}

exports.registeredClasses = async (req, res) => {
    pool.query(
        `SELECT * FROM courses WHERE $1 = ANY(student_ids)`,
        [req.headers.user.id], (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).send(result.rows)
            }
        }
    )
}

// exports.isRegistered = async (req, res) => {
//     pool.query(
//         `SELECT id, name FROM courses
//         WHERE id = $1 and $2 = ANY(student_ids)`,
//         [req.headers.class_id, req.headers.user.id], (err, result) => {
//             if (err) {
//                 console.log(err)
//                 res.status(400) 
//             } else {
//                 res.status(200).json(result.rows)
//             }
//         }
//     )
// }

// functions needed in the future are:
// getUsersFromCourse
// getCoursesFromUser
// availableCourses