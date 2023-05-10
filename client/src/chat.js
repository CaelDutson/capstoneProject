import React, { useEffect } from "react"; 
import { useState } from "react";  
import Select from 'react-select'; 
import Axios from "axios"; 
//import { LoadingIndicator, loadingIndicatorCSS } from "react-select/dist/declarations/src/components/indicators";


const Chat = () => {  
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState(null);
    const [chats, setChats] = useState(null);
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
            label: `${user.username}`,
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

    const getChat = (e) => {
        const name = sessionStorage.getItem('name');
        const chatName = {
          names: name,
        };
        Axios({
          method: 'POST',
          headers: {
            Authorization: 'bearer ' + sessionStorage.getItem('data') || 'invalid',
          },
          withCredentials: true,
          url: '/getChat',
          data: chatName,
        }).then((res) => {
          console.log(res.data);
          setChats(res.data);
          
        });
      };
      
      const getMessages = (chatId) => {
        Axios({
          method: 'POST',
          headers: {
            Authorization: 'bearer ' + sessionStorage.getItem('data') || 'invalid',
          },
          withCredentials: true,
          url: '/getMessages',
          data: { chatId },
        }).then((res) => {
          console.log(res.data);
          setMessages(res.data);
        });
      };
      
      
      useEffect(() => {
        getChat();
      }, []);  

      useEffect(() => {
        getMessages();
      }, []); 
      
      useEffect(() => {
        console.log(chats);
      }, [chats]); 
       


    const sendMessage = () => {
        const messageData = {
            chatId: selectedChat.id,
            sender: sessionStorage.getItem('name'),
            recipient: selectedChat.recipient_id,
            content: messageContent,
          };
      
        Axios({
          method: 'POST',
          headers: {
            Authorization: 'bearer ' + sessionStorage.getItem('data') || 'invalid',
          },
          withCredentials: true,
          url: '/sendMessage',
          data: messageData,
        })
          .then((res) => {
            console.log(res.data);
            // Reset the message content after sending the message
            setMessageContent('');
            // Update the messages for the selected chat
            getMessages(selectedChat.id);
          })
          .catch((error) => {
            console.log(error);
          });
      }; 

      
      
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
      <div>
  {chats && chats.length > 0 ? (
    <ul className="chats">
      {chats.map((item) => (
        <button key={item.id} onClick={() => setSelectedChat(item)}>
          {sessionStorage.getItem('name') === item.recipient_id
            ? item.sender_id
            : item.recipient_id}
        </button>
      ))}
    </ul>
  ) : null}
</div>

{selectedChat && (
  <div>
    <ul className="messages">
      {/* Render messages here */}
    </ul>
    <input
      type="text"
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
    />
    <button onClick={sendMessage}>Send</button>
  </div>
)}

    <div> 
    <div>
  {messages && messages.length > 0 ? (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>
          <p>{message.content}</p>
          <span>{message.timestamp}</span>
        </li>
      ))}
    </ul>
  ) : null}
</div>

    </div>
    </div>
  );
};

export default Chat;
