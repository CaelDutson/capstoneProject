const express = require('express'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const cors = require('cors')  
const fs = require('fs')
//setting up postgres  
const db = require('./db/db');
let dbURL = {
    connectionString: process.env.DATABASE_URL  || 'postgres://postgres:postgres@localhost:5432/postgres'
}
const Pool = require('pg').Pool; 
const pool = new Pool(dbURL);
//setting up react client
const app = express() 
const port = process.env.PORT || 4000; 
const reactClient = 'http://localhost:3000'; 
app.use(express.static('../client/build'));
app.use(express.json())
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)  

pool.connect();
app.post('/register', db.register, (req, res) => {  
    res.send('Registered')
}) 

app.get('/getUsers', db.getUsers);

app.get('/admin', (req,res)=> { 
    res.sendFile((__dirname+'/admin.html'));
}) 
app.post('/login', (data, res)=> { 
    console.log(data);
}) 

app.get('/', (req, res) => { 
    res.send('hello')
})
app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
}) 