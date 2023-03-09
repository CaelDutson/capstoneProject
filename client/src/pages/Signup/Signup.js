import React from "react";
import Axios from "axios";

import useHandleInput from "../../hooks/useHandleInput.js";

const Signup = () => {
    const [input, handleInput] = useHandleInput();

    const register = () => {
      Axios({
        method: "POST",
        data: input,
        withCredentials: true,
        url: "/register",
      }).then((res) => console.log(res));
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
        </div> 
    )
}

export default Signup;