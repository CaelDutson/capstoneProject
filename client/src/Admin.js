import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Admin = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null)

    const [input, setInput] = useState({
        adminUserName: "",
        adminPassword: "",
    })

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const Message = () => {
        if (message) {
            return <h1>{message}</h1>
        }
    }

    const register = async (e) => {
        e.preventDefault()

        await Axios({
          method: "POST",
          withCredentials: true,
          url: "/admin/login",
          data: input
        })
        .then((res) => {
            sessionStorage.setItem("data", res.data);
            navigate("/")      
        })
        .catch((err) => {
            setMessage(err.response.data);
        });
    }; 

    return (
        <>
            <h1>Welcome! Sign in to Continue</h1> 
            <form onSubmit={(e) => register(e)}> 
                <input type="text" onChange={(e) => handleInput(e)} name="adminUserName" id="adminUserName"/>
                <input type="password" onChange={(e) => handleInput(e)} name="adminPassword"/> 
                <input type="submit" value="Submit"/>
            </form>
            <Message/>
        </>
    )
}

export default Admin;