import logo from './logo.svg'; 
import React, { useState } from "react";
import './App.css'; 
import Axios from "axios";
import Navbar from './NavBar'; 

function App() { 
  const [registerUsername, setRegisterUsername] = useState(""); 
  const [registerPassword, setRegisterPassword] = useState(""); 
  const [registerEmail, setRegisterEmail] = useState("");
  const [userList, setUserList] = useState(null); 

  const register = () => {
    Axios({
      method: "POST",
      data: { 
        email: registerEmail,
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    }).then((res) => console.log(res));
  }; 
  const getUsers = () => { 
    Axios({ 
      method: "GET", 
      withCredentials: true, 
      url: '/getUsers', 
    }).then((res) => {
      console.log(res.data);
      setUserList(res.data);
    });
  }
  return (
    <div className="App"> 
      <div className='navbar'> 
        <Navbar />
      </div>
      <div>
        <h1>Register</h1> 
        <input type="email" placeholder="email" onChange={(e) => setRegisterEmail(e.target.value)}/>
        <input placeholder="username" onChange={(e) => setRegisterUsername(e.target.value)}/>
        <input placeholder="password" onChange={(e) => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div> 
      <div>
        <h1>Get All User</h1>
        <button onClick={getUsers}>Submit</button>
        {userList ? <h1>User List <ul>{userList.map((item)=><li key={item._id}>{item.email}: {item.username}</li>)}</ul></h1> : null}
      </div>
    </div>
  );
}

export default App;
