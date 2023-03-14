import React from "react"
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import useHandleInput from "../../hooks/useHandleInput.js";
import useMessage from "../../hooks/useMessage.js";

import AdminPage from "./AP";

const Login = () => {
    const navigate = useNavigate();
    const [message, handleMessage] = useMessage();
    const [input, handleInput] = useHandleInput();

    const register = async (e) => {
        e.preventDefault()

        await Axios({
          method: "POST",
          withCredentials: true,
          url: "/login",
          data: input
        })
        .then((res) => {
            sessionStorage.setItem("data", res.data);
            navigate("/")      
        })
        .catch((err) => {
            handleMessage(err.response.data);
        });
    };

    return (
        <>
            <h1>Welcome! Sign in to Continue</h1> 
            <form onSubmit={(e) => register(e)}> 
                <input type="text" onChange={(e) => handleInput(e)} name="adminUserName"/>
                <input type="password" onChange={(e) => handleInput(e)} name="adminPassword"/> 
                <input type="submit" value="Submit"/>
            </form>
           {message}
        </>
    )
}

export default Login;