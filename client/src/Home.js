import React, { useState } from "react";
import './App.css'; 
import Axios from "axios";
import Navbar from './NavBar'; 

function Home() { 
  const [input, setInput] = useState({
    username: "",
    password: "",
  })  

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }  

  const register = async (e) => { 
    setInput({...input, [e.target.name]: e.target.value})
    e.preventDefault()

    await Axios({
      method: "POST",
      withCredentials: true,
      url: "/login",
      data: input
    }).then((res, err) => { if(err) throw err; 
        console.log(res.data);  
        sessionStorage.setItem("data", res.data)  
        sessionStorage.setItem("username", input.username)
    });
};  

  return (
    <div className="App"> 
        <Navbar />
      <div>
        <h1>Login</h1> 
          <form onSubmit={(e) => register(e)}> 
              <input type="text" onChange={(e) => handleInput(e)} name="username" id="username"/>
              <input type="password" onChange={(e) => handleInput(e)} name="password"/> 
              <input type="submit" value="Submit"/>
          </form>  
      </div> 
      <div className="present"> 
        I know such empty we havent finished this please dont make fun of us
      </div>
    </div>
  );
}

export default Home;
