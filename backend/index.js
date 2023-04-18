const express = require('express');
const passport = require('passport') 
const initialize = require('./auth/passport-config.js')
const cookieParser = require('cookie-parser'); 
const session = require('express-session'); 
const cors = require('cors')  
const fs = require('fs')
//setting up postgres  
const db = require('./db/db');
// jwt
const jwtOptions = require('./auth/jsonToken.js');
//setting up react client
const app = express()  
const port = process.env.PORT || 4000; 
const reactClient = 'http://localhost:3000'; 
const path = require("path");

initialize(
    passport,
    db.getUsers
)

app.use(express.static('../client/build'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)
app.use(session({
    secret: '2',
    resave: false,
    saveUnintialize: false
}))
app.use(passport.session())

app.post('/register', db.register) 

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

app.get('/data', db.getData)

app.post('/classes', async (req, res) => {  
    console.log(req.body)
    const data = await db.getClasses(req.body); 
    console.log(data); 
    res.status(200).json(data)
})

app.post('/admin/login', async (req, res)=> { 
    console.log(req.body)
    const admin_data = await db.getAdmin(req.body);

    if (admin_data) {
        const token = jwtOptions.generateToken(admin_data);
        res.status(200).json(token); 
        //res.status(200).json(true)
    } else { 
        res.status(200).json(false)
    }
});  

app.post('/login', async (req, res)=> { 
    console.log(req.body)
    const data = await db.login(req.body);

    if (data) {
        const token = jwtOptions.generateToken(data);
        res.status(200).json(token); 
        //res.status(200).json(true)
    } else { 
        res.status(200).json(false)
    }
}); 

app.post('/getInfo', async (req, res) => { 
    console.log(req.headers.authorization)
    let token = req.headers.authorization

    let ress = jwtOptions.verifyToken(token)

    console.log(ress) 

    if(ress != -1){ 
        const data = await db.getInfo(req.body);  
        console.log(data)
        res.status(200).json(data)
    } else{ 
        console.log("nice try")
        
    }
})  

app.post('/editUsers', async (req, res) => { 
    console.log(req.headers.authorization)
    let token = req.headers.authorization

    let ress = jwtOptions.verifyToken(token)

    console.log(ress) 

    if(ress != -1){ 
        const data = await db.editUsers(req.body);  
        console.log(data)
        res.status(200).json(data)
    } else{ 
        res.status(401);
    }
    
}) 

app.post('/deleteUser', async (req, res) => { 
    const data = await db.deleteUser(req.body);  
    console.log(data)
    res.status(200).json(data)
})

// app.post('/login', async (req, res)=> { 
//     let user = await db.getUser(req.body);

//     if (user === undefined) {
//         res.status(401).json("Can't authenticate login credentials!")
//     } else {
//         const token = jwtOptions.generateToken(user);
//         res.status(200).json(token)
//     }
// }) 

app.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
})