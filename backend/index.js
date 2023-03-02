const express = require('express'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const cors = require('cors')  
const fs = require('fs')
//setting up postgres
let dbURL = {
    connectionString: process.env.DATABASE_URL  || 'postgres://postgres:postgres@localhost:5432/postgres'
}
const Pool = require('pg').Pool; 
const pool = new Pool(dbURL);
//setting up react client
const app = express() 
const port = process.env.PORT || 4000; 
const reactClient = 'http://localhost:3000'; 
app.use(express.static('../client/build')) 
app.use(express.static('../backend'))
app.use(express.json())
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)  

pool.connect();
app.post('/register', exports.register = (data, res) => {  
    console.log(data.body)
    pool.query(`insert into capstoneProjectUsers (email, username, password) values ('${data.body.email}', '${data.body.username}', '${data.body.password}')`, (err, results) => {  
        if(err) throw err;
        console.log(results)
    })
    console.log(data.body) 
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.test(data.body.email)) {
        pool.query(`insert into capstoneProjectUsers (email, username, password) values ('${data.body.email}', '${data.body.username}', '${data.body.password}')`, (err, results) => {  
            if(err) throw err;
            console.log(results)
        }) 
    } 
    else{ 
        return console.error('Not valid email');
    }

}) 

app.get('/getUsers', exports.getUsers = (req, res) => { 
    pool.query('SELECT * from capstoneProjectUsers', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}) 

app.get('/admin', (req,res)=> { 
    res.sendFile((__dirname+'/admin.html'));
})
app.get('/', (req, res) => { 
    res.send('hello')
})
app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
})