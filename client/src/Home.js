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
        <h1>Get All User</h1>
        <button onClick={getUsers}>Submit</button>
        {userList ? <h1>User List <ul>{userList.map((item)=><li key={item._id}>{item.email}: {item.username}</li>)}</ul></h1> : null}
      </div>
    </div>
  );
}

export default Home;
