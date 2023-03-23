import React from "react"
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import useHandleInput from "../../hooks/useHandleInput.js";
import useMessage from "../../hooks/useMessage.js";

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
            console.log(res.data)
            sessionStorage.setItem("data", res.data);
            navigate('/')
            // After 2 days of fighting with the navbar
            // I gave up on react so just reload the page
            window.location.reload(false);
        })
        .catch((err) => {
            handleMessage(err.response.data);
        });
    };

    return (
        <>
            <h1>Welcome! Sign in to Continue</h1> 
            <form onSubmit={(e) => register(e)}> 
                <input type="text" onChange={(e) => handleInput(e)} name="username" placeholder="Username"/>
                <input type="password" onChange={(e) => handleInput(e)} name="password" placeholder="Password"/> 
                <input type="submit" value="Submit"/>
            </form>
           {message}
        </>
    )
}

export default Login;