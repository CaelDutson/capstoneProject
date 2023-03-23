import React, { useState } from "react";
import './App.css'; 
import Axios from "axios";

function Home() {
  // const [userList, setUserList] = useState(null); 

  // const getUsers = () => { 
  //   Axios({ 
  //     method: "GET",
  //     headers: {
  //       Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
  //     },
  //     withCredentials: true, 
  //     url: '/getUsers', 
  //   }).then((res) => {
  //     console.log(res.data);
  //     setUserList(res.data);
  //   });
  // }

  return (
    <div className="App"> 
      <div>
        <h1>Welcome!</h1>
      </div>
    </div>
  );
}

export default Home;
