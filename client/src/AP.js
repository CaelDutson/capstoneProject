import React, { useEffect } from "react";
import { useState } from "react"
import Axios from "axios"; 

const AdminSignedIn = () => {  
    const [userList, setUserList] = useState(null);  
    const [message, setMessage] = useState('...Loading'); 
    const [message2, setMessage2] = useState(null);
    const [users, setUsers] = useState(null);
    const [input, setInput] = useState({ 
        userName: ""
    }); 
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userInputs, setUserInputs] = useState({});

    const [editInput, setEditInput] = useState({ 
        firstName: "", 
        lastName: "", 
        userName: "", 
        password: "", 
        address: "", 
        telephone: "", 
        email: "",
        id: null,
    });  
    const [currentEditInput, setCurrentEditInput] = useState({ 
        firstName: "", 
        lastName: "", 
        userName: "", 
        password: "", 
        address: "", 
        telephone: "", 
        email: "",
        id: null,
    }); 
    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value}); 
    }  
    //const handleInput2 = (e) => {
        //setEditInput(prevState => ({...prevState, [e.target.name]: e.target.value}));  
        //console.log(editInput);
    //}   
    const handleInput2 = (e) => {
        const { name, value } = e.target;
        setUserInputs(prevState => ({
          ...prevState,
          [currentUserId]: {
            ...prevState[currentUserId],
            [name]: value === '' ? '' : value // set to empty string if value is empty
          }
        })); 
    };
      
      
    const search = async (e) => { 
        setMessage2('...Loading')
        e.preventDefault()

        await Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/getInfo', 
            data: input
          }).then((res) => {console.log(res.data);  

            setUserList(res.data); 
            const error = res.data; 
            console.log(error.length);
            if (error.length == 0){  
                setUserList(false); 
                setMessage2('Search Not Found');
            }
        })
    };  
    
    const editUsers = async (e) => {
        e.preventDefault();
        const userToUpdate = users.find(user => user.id === currentUserId);
        const updatedUserData = userInputs[currentUserId]; 
        console.log(updatedUserData); 
        console.log(userToUpdate);
        
        // Convert updated user data into the desired format
        const updatedUser = {
          firstname: updatedUserData.firstName || userToUpdate.firstname,
          lastname: updatedUserData.lastName || userToUpdate.lastname,
          username: updatedUserData.userName || userToUpdate.username,
          password: updatedUserData.password || userToUpdate.password,
          address: updatedUserData.address || userToUpdate.address,
          telephone: updatedUserData.telephone || userToUpdate.telephone,
          email: updatedUserData.email || userToUpdate.email,
          id: userToUpdate.id
        };
      
        await Axios({
          method: "POST",
          headers: {
            Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
          },
          withCredentials: true,
          url: '/editUsers',
          data: updatedUser
        }).then((res) => {
          console.log(res.data);
          setUserInputs(prevState => ({...prevState, [currentUserId]: res.data}));
        });
      };
      
      
      
      
    const deleteUser = async (e) => { 
        e.preventDefault();  
        const data = {'id': currentUserId}

        await Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/deleteUser', 
            data: data
          }).then((res) => {console.log(res.data); setEditInput(res.data)})
    };  

    useEffect(() => {
        const interval = setInterval(() => {
          getUsers();
        }, 2500);
    
        return () => clearInterval(interval);
      }, []); 

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
          setUsers(res.data); 
        }); 
      }   

      const handleButtonClick = (e) => {
        Collapsible(); 
        const parent = e.target.parentElement;
        const inputs = parent.querySelectorAll('input'); 
        const inputValues = {};
        inputs.forEach((input) => {
            inputValues[input.name] = input.value; 
        
        });
        const userId = e.target.value;
        setCurrentUserId(userId);
        setUserInputs(prevState => ({...prevState, [userId]: {...prevState[userId], id: userId}}));
        //handleInput2(e);
      };

      const Collapsible = () => { 
        var coll = document.getElementsByClassName("collapsible");

        for (let i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }
      }
      
    return ( 
        <div>  
            <div className="adminContent"> 
                <div className="searchUser">  
                    <form onSubmit={(e) => search(e)}> 
                        <h6>*You can even search through first, last name, user name, or email</h6>
                        <input onChange={(e) => handleInput(e)} name="userName"></input> 
                        <button value="submit">Submit</button>  
                        {userList ? <ul className="editUsersList">{userList.map((item)=><li key={item.id}><button className="collapsible" name="id" value={item.id} onClick={(e)=> {handleButtonClick(e)}}>{item.firstname} {item.lastname}</button>  
                            <div id="collapsibleContent" className="userList"> 
                            Username: <input id="username" onChange={(e) => handleInput2(e)} type='text' name="userName" value={userInputs[item.id]?.userName || item.username}></input>  
                            ID:<input value={item.id}></input>  
                            Password: <input id="password" onChange={(e) => handleInput2(e)} type='text' name="password" value={userInputs[item.id]?.password || item.password}></input> 
                            Firstname: <input id="firstname" onChange={(e) => handleInput2(e)} type='text' name="firstName" value={userInputs[item.id]?.firstName || item.firstname}></input> 
                            Lastname: <input id="lastname" onChange={(e) => handleInput2(e)} type='text' name="lastName" value={userInputs[item.id]?.lastName || item.lastname}></input> 
                            Email: <input id="email" onChange={(e) => handleInput2(e)} type='text' name="email" value={userInputs[item.id]?.email || item.email}></input> 
                            Phone Number: <input id="telephone" onChange={(e) => handleInput2(e)} type='text' name="telephone" value={userInputs[item.id]?.telephone || item.telephone}></input> 
                            Address: <input id="address" onChange={(e) => handleInput2(e)} type='text' name="address" value={userInputs[item.id]?.address || item.address}></input> 
                            <div><button onClick={(e) => editUsers(e)} id={item.id}>Save</button><button onClick={(e) => deleteUser(e)} name="id" id={item.id}>Delete</button></div></div>  
                        </li>)}</ul> : message2} 
                    </form>
                </div> 
            </div>  
            <div className="getUsers"> 
                <div className="displayUsers">
                    <div className="editUsers">
                        {users ? <ul className="editUsersList">{users.map((item)=><li key={item.id}><button className="collapsible" name="id" value={item.id} onClick={(e)=> {handleButtonClick(e)}}>{item.firstname} {item.lastname}</button>  
                            <div id="collapsibleContent" className="userList"> 
                            Username: <input id="username" onChange={(e) => handleInput2(e)} type='text' name="userName" value={userInputs[item.id]?.userName || item.username}></input>  
                            ID:<input value={item.id}></input>  
                            Password: <input id="password" onChange={(e) => handleInput2(e)} type='text' name="password" value={userInputs[item.id]?.password || item.password}></input> 
                            Firstname: <input id="firstname" onChange={(e) => handleInput2(e)} type='text' name="firstName" value={userInputs[item.id]?.firstName || item.firstname}></input> 
                            Lastname: <input id="lastname" onChange={(e) => handleInput2(e)} type='text' name="lastName" value={userInputs[item.id]?.lastName || item.lastname}></input> 
                            Email: <input id="email" onChange={(e) => handleInput2(e)} type='text' name="email" value={userInputs[item.id]?.email || item.email}></input> 
                            Phone Number: <input id="telephone" onChange={(e) => handleInput2(e)} type='text' name="telephone" value={userInputs[item.id]?.telephone || item.telephone}></input> 
                            Address: <input id="address" onChange={(e) => handleInput2(e)} type='text' name="address" value={userInputs[item.id]?.address || item.address}></input> 
                            <div><button onClick={(e) => editUsers(e)} id={item.id}>Save</button><button onClick={(e) => deleteUser(e)} name="id" id={item.id}>Delete</button></div></div>  
                        </li>)}</ul> : message} 
                    </div>
                </div>
            </div> 
        </div>
    )
} 

export default AdminSignedIn;