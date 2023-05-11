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

function isLogged(req, res, next) {
    let token = req.headers.authorization

    try {
        let verifiedToken = jwtOptions.verifyToken(token)
        req.headers.user = verifiedToken.user
        next()
    } catch (err) {
        res.status(401).send('Not Logged')
    }
}

function isAdmin(req, res, next) {
    if(req.headers.user.isAdmin){ 
        next()
    } else { 
        res.status(401).send('Not Authorized');
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

app.post('/getInfo', isLogged, isAdmin, async (req, res) => { 
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
        res.status(401).send('Invalid');
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
        res.status(401).send('Invalid');
    }
    
}) 

app.post('/deleteUser', async (req, res) => { 
    const data = await db.deleteUser(req.body);  
    console.log(data)
    res.status(200).json(data)
}) 

app.post('/createChat', async (req, res) => {
    try {
      if (req.body.label == null || req.body.label === '') {
        res.status(400).json({ message: 'You have to select a user' });
      } else {
        const chatId = await db.createChat(req.body);
        res.status(200).json({ id: chatId });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }); 

  app.post('/deleteChat', async (req, res) => { 
    const results = await db.deleteChat(req.body);
  })
  
  app.post('/getChat', async (req, res) => { 
    console.log(req.body)
    const userId = req.body;
    try {
      const chats = await db.getChat(userId);
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/getMessages', async (req, res) => {
    const  chatId  = req.body;
    try {
      const messages = await db.getMessages(chatId);
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/sendMessage', async (req, res) => {
    const { chatId, sender, recipient, content } = req.body;
    try {
      const messageData = await db.sendMessage(chatId, sender, recipient, content);
      res.status(200).json(messageData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  
  

app.post('/classRegister', isLogged, db.classRegister)

app.post('/classUnregister', isLogged, db.classUnregister)

app.post('/isRegistered', isLogged, (req, res) => {
    let ids = req.body

    if (ids.includes(parseInt(req.headers.user.id))) {
        res.status(200).send('working')
    } else {
        res.status(401).send('Not working')
    }
})

app.get('/getRegisteredCourses', isLogged, db.registeredClasses);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => { 
    console.log(`server is up on port ${port}`)
})