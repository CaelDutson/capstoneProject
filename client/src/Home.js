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
  const [registerAddress, setRegisterAdress] = useState("");

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
  return (
    <div className="App"> 
      <div className='navbars'> 
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
    </div>
  );
}

export default Home;
