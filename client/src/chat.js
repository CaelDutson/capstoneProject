import React, { useEffect } from "react"; 
import { useState } from "react";  
import Select from 'react-select'; 
import Axios from "axios"; 


const Chat = () => {  
    const [content, setContent] = useState('');  
    const [createdChat, setCreatedChat] = useState({  
        sender: sessionStorage.getItem('name'),
        label: '', 
        id: ''
    });
    const [users, setUsers] = useState(null);


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
          const transformedUsers = res.data.map(user => ({
            label: `${user.firstname}`,
            id: user.id, 
            name : 'label'
          }));
          setUsers(transformedUsers); 
        }); 
    }  
    useEffect(() => { 
        getUsers();
    }, 1); 

    const createChat = (e) => { 
        e.preventDefault(); 
        console.log(createdChat)
        Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/createChat',  
            data: createdChat
          }).then((res)=> { 
            console.log(res.data)
          })
    }


    const sendMessage = (e) => { 
        e.preventDefault();
    } 
  return (
    <div className="chats">
      <div> 
      <Select 
            options={users}
            isMulti
            onChange={(e) => e.map(item => {setCreatedChat({...createdChat, [item.name]: item.label})})}
        /> 
        <button onClick={createChat}>+</button>
      </div>
    </div>
  );
};

export default Chat;
