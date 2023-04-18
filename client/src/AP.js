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
    const handleInput2 = (e) => {
        setEditInput({...editInput, [e.target.name]: e.target.value}); 
    }  
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
        e.preventDefault()
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
                    {users ? <h1>User List <ul>{users.map((item)=><li key={item._id}>{item.firstname} {item.lastname}:  Username: {item.username} ID:{item.id}</li>)}</ul></h1> : null}
                </div>
            </div> 
        </div>
    )
} 

export default AdminSignedIn;