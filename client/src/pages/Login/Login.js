import React from "react"
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import useHandleInput from "../../hooks/useHandleInput.js";
import useMessage from "../../hooks/useMessage.js"; 
import Navbar from "../../NavBar.js";

const Login = () => {
    const navigate = useNavigate();
    const [message, handleMessage] = useMessage();
    const [input, handleInput] = useHandleInput();

    const register = async (e) => {
        e.preventDefault() 
        console.log(input);

        await Axios({
          method: "POST",
          withCredentials: true,
          url: "/login",
          data: input
        })
        .then((res) => {
            console.log(res.data)
            sessionStorage.setItem("data", res.data);
            sessionStorage.setItem("name", input.username)
            navigate('/dashboard')
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
            <Navbar />
            <form className="register" onSubmit={(e) => register(e)}> 
                <h2>Sign In</h2> 
                <div className="contentRegister">
                    <input type="text" onChange={(e) => handleInput(e)} name="username" placeholder="Username"/>
                    <input type="password" onChange={(e) => handleInput(e)} name="password" placeholder="Password"/> 
                    <input type="submit" value="Submit"/> 
                </div>
            </form>
           {message}
        </>
    )
}

export default Login;