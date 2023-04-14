import React, { useEffect } from "react"
import { useState } from "react"
import Axios from "axios";
import Navbar from "../../NavBar"; 
import AdminPage from "../../AP";
import { json } from "react-router-dom";
const Admin = () => {
    const [input, setInput] = useState({
        adminUserName: "",
        adminPassword: "",
    })

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }  
    
    const data = sessionStorage.data;
    let result = false;
    console.log(data);
    if (
    data == false ||
    data == "false" ||
    data == null ||
    data == "null" ||
    data == undefined ||
    data == "undefined"
    ) {
    result = false; 
    } else {
    result = true;
    }
const [showResults, setShowResults] = useState(result);

    

    const register = async (e) => { 
        setInput({...input, [e.target.name]: e.target.value})
        e.preventDefault()
        
        await Axios({
          method: "POST",
          withCredentials: true,
          url: "/admin/login",
          data: input
        }).then((res, err) => { if(err) throw err; 
            console.log(res.data);  
            sessionStorage.setItem("data", res.data) 
            if(res.data == false || NaN){ 
                setShowResults(false)
            }
            setShowResults(res.data)
        });
    };  

    return (
        <> 
            <Navbar /> 
            <div className="adminTitle">
                <h1>Welcome! Sign in to Continue</h1>  
            </div> 
            <div className="adminSignIn">
            <form onSubmit={(e) => register(e)}> 
                <input type="text" onChange={(e) => handleInput(e)} name="adminUserName" id="adminUserName"/>
                <input type="password" onChange={(e) => handleInput(e)} name="adminPassword"/> 
                <input type="submit" value="Submit"/>
            </form>  
            </div>
            <div className="adminStuff">
                { showResults ? <AdminPage /> : true }
            </div>
        </>
    )
}

export default Admin;