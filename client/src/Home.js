import React, { useState } from "react";
import './App.css'; 
import Axios from "axios";
import Navbar from './NavBar'; 

function Home() { 
  const [registerUsername, setRegisterUsername] = useState(""); 
  const [registerPassword, setRegisterPassword] = useState(""); 
  const [registerEmail, setRegisterEmail] = useState(""); 
  const [registerFirstName, setRegisterFirstName] = useState(""); 
  const [registerLastName, setRegisterLastName] = useState(""); 
  const [registerTelephone, setRegisterTelephone] = useState(""); 
  const [registerAddress, setRegisterAdress] = useState("")
  const [userList, setUserList] = useState(null); 

  const register = () => {
    Axios({
      method: "POST",
      data: { 
        email: registerEmail,
        username: registerUsername,
        password: registerPassword, 
        firstName: registerFirstName, 
        lastName: registerLastName, 
        telephone: registerTelephone, 
        address: registerAddress
      },
      withCredentials: true,
      url: "/register",
    }).then((res) => console.log(res));
  }; 
  const getUsers = () => { 
    Axios({ 
      method: "GET",
      headers: {
        Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
      },
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
      <div className='register'>
        <h1>Register</h1> 
        <input type="email" placeholder="Email" onChange={(e) => setRegisterEmail(e.target.value)}/>
        <input placeholder="Username" onChange={(e) => setRegisterUsername(e.target.value)}/>
        <input placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)}/> 
        <input placeholder="First Name" onChange={(e) => setRegisterFirstName(e.target.value)}/> 
        <input placeholder="Last Name" onChange={(e) => setRegisterLastName(e.target.value)}/> 
        <input placeholder="Telephone" onChange={(e) => setRegisterTelephone(e.target.value)}/> 
        <input placeholder="Address" onChange={(e) => setRegisterAdress(e.target.value)}/>
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

export default Home;
