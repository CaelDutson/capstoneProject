import React from "react";
import { useState } from "react";

import Axios from "axios";

import List from "./List";
import useHandleInput from "../../hooks/useHandleInput.js"; 
import Navbar from "../../NavBar"; 
import Admin from "../../AP";


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
        <Admin />
    )
}

export default Users;