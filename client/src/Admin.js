import React from "react"
import { useState } from "react"
import Axios from "axios";

const Admin = () => {
    const [input, setInput] = useState({
        adminUserName: "",
        adminPassword: "",
    })

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const register = async (e) => {
        e.preventDefault()

        await Axios({
          method: "POST",
          withCredentials: true,
          url: "/admin/login",
          data: input
        }).then((res) => sessionStorage.setItem("data", res.data));
    }; 

    return (
        <>
            <h1>Welcome! Sign in to Continue</h1> 
            <form onSubmit={(e) => register(e)}> 
                <input type="text" onChange={(e) => handleInput(e)} name="adminUserName" id="adminUserName"/>
                <input type="password" onChange={(e) => handleInput(e)} name="adminPassword"/> 
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default Admin;