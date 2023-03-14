import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import useHandleInput from "../../hooks/useHandleInput.js";
import useMessage from "../../hooks/useMessage.js";

const Signup = () => {
    const navigate = useNavigate();
    const [input, handleInput] = useHandleInput();
    const [message, handleMessage] = useMessage();

    const register = () => {
      Axios({
        method: "POST",
        data: input,
        withCredentials: true,
        url: "/register",
      })
      .then((_) => {
        navigate("/")
      })
      .catch((err) => {
        handleMessage(err.response.data)
      });
    };

    console.log(input)

    return (
        <div className='register'>
            <h1>Register</h1> 
            <input type="email" placeholder="Email" name="email" onChange={(e) => handleInput(e)}/>
            <input placeholder="Username" name="username" onChange={(e) => handleInput(e)}/>
            <input placeholder="Password" name="password" onChange={(e) => handleInput(e)}/> 
            <input placeholder="First Name" name="firstName" onChange={(e) => handleInput(e)}/> 
            <input placeholder="Last Name" name="lastName" onChange={(e) => handleInput(e)}/> 
            <input placeholder="Telephone" name="telephone" onChange={(e) => handleInput(e)}/> 
            <input placeholder="Address" name="address"onChange={(e) => handleInput(e)}/>
            <button onClick={register}>Submit</button>
            {message}
        </div> 
    )
}

export default Signup;