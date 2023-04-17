const express = require('express');
const cors = require('cors')  
//setting up postgres  
const db = require('./db/db');
const hashOptions = require('./auth/hashOptions.js')
// jwt
const jwtOptions = require('./auth/jsonToken.js');
//setting up react client
const app = express()  
const port = process.env.PORT || 4000; 
const reactClient = 'http://localhost:3000'; 
const path = require("path");

app.use(express.static('../client/build'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( 
    cors({ 
        origin: reactClient, 
        credentials: true
    })
)

app.post('/register', db.register) 

// Might change it to detect if person is admin later on
function isLogged(req, res, next) {
    let token = req.headers.authorization

    try {
        jwtOptions.verifyToken(token)
        next()
    } catch (err) {
        res.status(401)
    }
}


// To be used if server side is better than react
// app.get('/api/auth/login', isLogged, (req, res) => {
//     res.redirect('/')
// })

app.get('/getUsers', isLogged, db.getUsers);

app.get('/getCourses', db.getCourses);

// only one instance of usage so might merge it with /login route
async function authenticate(req, res, next) {
    let user = await db.getUser(req.body);

    if (!user) {
        res.status(401).json("Can't authenticate email")
    } else if (!(await hashOptions.comparePassword(req.body.password, user.hash))) {
        res.status(401).json("Can't authenticate password")
    } else {
        req.user = user
        next()
    }
}

app.post('/login', authenticate, async (req, res)=> { 
        const token = jwtOptions.generateToken(req.user);
        res.status(200).json(token)
}) 

// async function isAdmin() {
//     let token = req.headers.authorization
//     let ress = jwtOptions.verifyToken(token)

//     if(ress != 1){ 
//         const data = await db.getInfo(req.body);  
//         console.log(data)
//         res.status(200).json(data)
//     } else{ 
//         res.status(401);
//     }
// }

app.post('/getInfo', isLogged, async (req, res) => { 
    const data = await db.getInfo(req.body);  
    res.status(200).json(data)
}) 

app.post('/editUsers', async (req, res) => { 
    console.log(req.headers.authorization)
    let token = req.headers.authorization

    let ress = jwtOptions.verifyToken(token)

    console.log(ress) 

    if(ress != 1){ 
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

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
})