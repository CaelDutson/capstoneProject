const express = require('express'); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const cors = require('cors')  
const fs = require('fs')
//setting up postgres  
const db = require('./db/db');
// jwt
const jwtOptions = require('./auth/jsonToken.js');
const { get } = require('http');
//setting up react client
const app = express()  
const port = process.env.PORT || 4000; 
const reactClient = 'http://localhost:3000'; 
const path = require("path")

app.use(express.static('../client/build'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)  

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.post('/register', db.register, (req, res) => {  
    res.send('Registered')
}) 

app.get('/getUsers', (req, res) => {
    console.log(req.headers.authorization)
    let token = req.headers.authorization

    let ress = jwtOptions.verifyToken(token)

    console.log(ress)

    if (ress != -1) {
        db.getUsers(req, res)
    } else {
        res.status(401)
    }
});

// app.get('/admin/login', (req,res)=> { 
//     res.sendFile((__dirname+'/admin.html'));
// }) 
app.post('/admin/login', async (req, res)=> { 
    console.log(req.body)
    const admin_data = await db.getAdmin(req.body);

    if (admin_data) {
        const token = jwtOptions.generateToken(admin_data);
        res.status(200).json(token)
    } else {
        res.send("bad")
    }
}) 

// app.get('/', (req, res) => { 
//     res.send('hello')
// })
app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
})