const express = require('express'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const cors = require('cors')

//setting up postgres
const db = require('./db/db.js')

//setting up react client
const app = express() 
const port = process.env.PORT || 4000; 
const reactClient = 'http://localhost:3000'; 

app.use(express.static('../client/build'))
app.use(express.json())
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)  

app.post('/register', exports.register = (data, res) => {  
    console.log(data.body) 
    let email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.test(data.body.email)) {
        db.register(data.body)
    } 
    else{ 
        return console.error('Not valid email');
    }

}) 

app.get('/getUsers', exports.getUsers = (req, res) => { 
    db.getUsers();
})

app.get('/', (req, res) => { 
    res.send('hello')
})

app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
})