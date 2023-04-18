import React from "react";
import { useState } from "react";

import Axios from "axios";

import List from "./List";
import useHandleInput from "../../hooks/useHandleInput.js";


const Users = () => {
    const [data, setData] = useState([]);
    const [input, handleInput] = useHandleInput();

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
          }).then((res) => {
            setData(res.data)
          })
    }; 

    return (
        <div className="adminContent"> 
            <div className="searchUser">  
                <form onSubmit={(e) => search(e)}> 
                    <input onChange={(e) => handleInput(e)} name="userName"></input> 
                    <button value="submit">Submit</button> 
                    {/* {userList ? <h1>Choose who to edit <ul>{userList.map((item)=><><li><input onChange={(e) => handle2(e)} type="radio" id={item.id} name="id" value={item.id} /><label for="html">{item.firstname} {item.lastname}  ID:{item.id}</label></li></>)}</ul></h1> : null} */}
                    <List list={data} />
                </form>
            </div> 
        </div>
    )
}

export default Users;