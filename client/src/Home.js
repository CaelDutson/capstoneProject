import React, { useState } from "react";
import './App.css'; 
import Axios from "axios";
import Navbar from './NavBar'; 

function Home() {
  const [userList, setUserList] = useState(null); 
  
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
        <Navbar />
      <div>
        <h1>Login</h1> 
        <form > 
                <input type="text"  name="adminUserName" id="adminUserName"/>
                <input type="password"  name="adminPassword"/> 
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
