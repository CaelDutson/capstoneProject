import React from "react" 
import { useState } from "react"
import Axios from "axios"; 

const AdminSignedIn = () => {  
    const [userList, setUserList] = useState(null);  
    const [users, setUsers] = useState(null);
    const [input, setInput] = useState({ 
        userName: ""
    })  
    const [editInput, setEditInput] = useState({ 
        firstName: "", 
        lastName: "", 
        userName: "", 
        password: "", 
        address: "", 
        telephone: "", 
        email: "",
        id: null,
    })  
    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }  
    //const handleInput2 = (e) => {
        //setEditInput(prevState => ({...prevState, [e.target.name]: e.target.value}));  
        //console.log(editInput);
    //}   
    const handleInput2 = (e) => {
        const { name, value } = e.target;  
        setEditInput(prevState => ({...prevState, [name]: value}));
        console.log(value); 
        console.log(name);
      };
    const search = async (e) => {
        e.preventDefault()

        await Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/getInfo', 
            data: input
          }).then((res) => {console.log(res.data); setUserList(res.data)})
    };  
    const editUsers = async (e) => {
        e.preventDefault();   
        const { name, value } = e.target;  
        setEditInput(prevState => ({...prevState, [name]: value}));
        console.log(value); 
        console.log(name);
        await Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/editUsers', 
            data: editInput
          }).then((res) => {console.log(res.data); setEditInput(res.data)})
    }; 
    const deleteUser = async (e) => { 
        setEditInput({...editInput, [e.target.name]: e.target.value});
        e.preventDefault()

        await Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/deleteUser', 
            data: editInput
          }).then((res) => {console.log(res.data); setEditInput(res.data)})
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
          setUsers(res.data);
        });
      }  

      const handleButtonClick = (e) => {
        Collapsible();
        handleInput2(e);
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
                        <input onChange={(e) => handleInput(e)} name="userName"></input> 
                        <button value="submit">Submit</button> 
                        {userList ? <h1>Choose who to edit <ul>{userList.map((item)=><><li><input onChange={(e) => handleInput2(e)} type="radio" id={item.id} name="id" value={item.id} /><label for="html">{item.firstname} {item.lastname}  ID:{item.id}</label></li></>)}</ul></h1> : null}
                    </form>
                </div> 
            </div> 
            <div className="editUsers">  
                <div className="text"><h3>*Note: You must search and select a person first. If you leave any blank inputs, the changes will still be applied</h3></div> 
                <div className="inputUsers">
                    <form onSubmit={editUsers}>
                        <input placeholder="First Name" onChange={(e) => handleInput2(e)} type='text' name="firstName"></input> 
                        <input placeholder="Last Name" onChange={(e) => handleInput2(e)} type='text' name="lastName"></input> 
                        <input placeholder="Username" onChange={(e) => handleInput2(e)} type='text' name="userName"></input> 
                        <input placeholder="Password" onChange={(e) => handleInput2(e)} type='text' name="password"></input> 
                        <input placeholder="Address" onChange={(e) => handleInput2(e)} type='text' name="address"></input> 
                        <input placeholder="telephone" onChange={(e) => handleInput2(e)} type='text' name="telephone"></input> 
                        <input placeholder="email" onChange={(e) => handleInput2(e)} type='text' name="email"></input> 
                        <button>Submit</button> 
                    </form>  
                </div>
                <form onSubmit={deleteUser}> 
                    <button>DELETE</button>
                </form>
            </div> 
            <div className="getUsers"> 
                <div>
                    <h3>Display all students</h3>
                    <button onClick={getUsers}>Submit</button> 
                    {users ? <ul>{users.map((item)=><li key={item.id}><button className="collapsible" name="id" value={item.id} onClick={(e)=> {handleButtonClick(e)}}>{item.firstname} {item.lastname}</button>  
                        <div id="collapsibleContent" className="userList">Username: <input id="username" onChange={(e) => handleInput2(e)} type='text' name="userName" value={editInput.userName !== '' ? editInput.userName : item.username}></input> ID:<input value={item.id}></input> Password: <input id="password" onChange={(e) => handleInput2(e)} type='text' name="password" value={editInput.password !== '' ? editInput.password : item.password}></input>Firstname: <input id="firstname" onChange={(e) => handleInput2(e)} type='text' name="firstName" value={editInput.firstName !== '' ? editInput.firstName : item.firstname}></input>Lastname: <input id="lastname" onChange={(e) => handleInput2(e)} type='text' name="lastName" value={editInput.lastName !== '' ? editInput.lastName : item.lastname}></input>Email: <input id="email" onChange={(e) => handleInput2(e)} type='text' name="email" value={editInput.email !== '' ? editInput.email : item.email}></input>Phone Number: <input id="telephone" onChange={(e) => handleInput2(e)} type='text' name="telephone" value={editInput.telephone !== '' ? editInput.telephone : item.telephone}></input>Address: <input id="address" onChange={(e) => handleInput2(e)} type='text' name="address" value={editInput.address !== '' ? editInput.address : item.address}></input><div><button onClick={(e) => editUsers(e)} id={item.id}>Save</button><button id={item.id}>Delete</button></div></div>  
                        </li>)}</ul> : null}
                </div>
            </div> 
        </div>
    )
} 

export default AdminSignedIn;