import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Axios from 'axios';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [createdChat, setCreatedChat] = useState({
    sender: sessionStorage.getItem('name'),
    label: '',
    id: '',
    deleteChat: null,
  });
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    getChat();
  }, []);

  const getUsers = () => {
    Axios.get('/getUsers', {
      headers: {
        Authorization: 'bearer ' + sessionStorage.getItem('data') || 'invalid',       
        },
        withCredentials: true,
      })
        .then((res) => {
          const transformedUsers = res.data.map((user) => ({
            value: user.id,
            label: user.username,
          }));
          setUsers(transformedUsers);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const createChat = (e) => {
        e.preventDefault();
        if (createdChat.label === '') {
          console.log('You have to select a user');
          return;
        }
      
        if (createdChat.deleteChat) {
          deleteChat(createdChat.deleteChat, () => {
            createNewChat();
          });
        } else {
          createNewChat();
        }
      };
      
      const createNewChat = () => {
        const existingChat = chats.find(
          (chat) =>
            (sessionStorage.getItem('name') === chat.recipient_id &&
              createdChat.label === chat.sender_id) ||
            (sessionStorage.getItem('name') === chat.sender_id &&
              createdChat.label === chat.recipient_id)
        );
      
        if (existingChat) {
          setSelectedChat(existingChat);
          getMessages(existingChat.id); // Fetch messages for the existing chat
          return;
        }
      
        Axios.post('/createChat', createdChat)
          .then((res) => {
            setSelectedChat(res.data);
            getMessages(res.data); // Fetch messages for the newly created chat
          })
          .catch((error) => {
            console.log(error);
          });
      }; 

      const deleteChat = (chat, callback) => { 
        console.log(chat)
        Axios.post('/deleteChat', chat)
          .then((res) => {
            if (res.data.success) {
              callback(); // Call the callback function after successful deletion
            } else {
              console.error(res.data.error);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      
  
    const getChat = async() => {
      const userId = sessionStorage.getItem('name'); 
      const data = { 
        name: userId
      }
      await Axios({
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/getChat', 
            data: data
        }).then((res) => { 
            console.log(res.data);
            setChats(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    };
  
    const getMessages =  async (chat) => {  
        console.log(chat)
        const data = { 
            sender: chat.sender_id,
            recipient: chat.recipient_id,
        } 
        console.log(data)
        await Axios({
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/getMessages', 
            data: data
        }).then((res) => { 
            console.log(res.data)
            setMessages(res.data); 
            console.log(messages)
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      
  
      const sendMessage = () => { 
        let recipientId; 
        console.log(selectedChat)
        
        if(selectedChat.recipient_id == sessionStorage.getItem('name')){ 
            recipientId = selectedChat.sender_id;
        } else{ 
            recipientId = selectedChat.recipient_id
        }
        
        const messageData = {
          chatId: selectedChat?.id || createdChat.id,
          sender: sessionStorage.getItem('name'),
          recipient: recipientId,
          content: messageContent,
        };
        
        Axios.post('/sendMessage', messageData)
          .then((res) => {
            setMessageContent('');
            if (selectedChat) {
              getMessages(selectedChat);
            } else {
              getMessages(createdChat);
            }
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
            onChange={(selectedOptions) =>
              setCreatedChat({ ...createdChat, label: selectedOptions })
            }
          />
          <button onClick={createChat}>+</button>
        </div>
  
        <div>
        {chats.map((chat) => (
  <li key={chat.id}>
    <button
      onClick={() => {
        setSelectedChat(chat);
        getMessages(chat);
      }}
    >
      {chat.recipient_id === sessionStorage.getItem('name')
        ? chat.sender_id
        : chat.recipient_id}
    </button>
    <button
      className="delete-chat-btn"
      onClick={() => {
        deleteChat(chat);
      }}
    >
      Delete
    </button>
  </li>
))}

        </div>
  
        {selectedChat && (
          <div>
                <ul className="messages">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <li key={message.id}>
                            <p>{message.content}</p> 
                            <p>-{message.sender_id}</p>
                            <span>{message.timestamp}</span>
                            </li>
                        ))
                    ) : (
                        <li>No messages</li>
                        )}
                </ul>

          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;

  


