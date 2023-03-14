import React from "react"
import { useState } from "react"
import Axios from "axios";
import Navbar from "./NavBar"; 
import AdminPage from "./AP";
const Admin = () => {
    const [input, setInput] = useState({
        adminUserName: "",
        adminPassword: "",
    })

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    } 

    const [showResults, setShowResults] = useState(false); 

    const register = async (e) => { 
        setInput({...input, [e.target.name]: e.target.value})
        e.preventDefault()

        await Axios({
          method: "POST",
          withCredentials: true,
          url: "/admin/login",
          data: input
        }).then((res) => {console.log(res.data);  
            sessionStorage.setItem("data", res.data); 
            setShowResults(res.data)
        });
    }; 

    return (
        <> 
            <Navbar />
            <h1>Welcome! Sign in to Continue</h1> 
            <form onSubmit={(e) => register(e)}> 
                <input type="text" onChange={(e) => handleInput(e)} name="adminUserName" id="adminUserName"/>
                <input type="password" onChange={(e) => handleInput(e)} name="adminPassword"/> 
                <input type="submit" value="Submit"/>
            </form> 
            <div className="adminStuff">
                { showResults ? <AdminPage /> : null }
            </div>
        </>
    )
}

export default Admin;