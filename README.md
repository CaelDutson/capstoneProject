Commands: 

npm run build 
npm run start  

Note: 

You must add the start and build commands in the package.json. 

Use npm init -y in the main folder 

Put this in the main folders package json: 

"start": "npm i bcryptjs  cookie-parser  cors  express  express-session  mongoose pg  passport passport-local && cd backend && npm start",
"build": "cd backend && npm i && cd ../client && npm i && npm run build" 




