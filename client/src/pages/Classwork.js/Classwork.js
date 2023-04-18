import React, { useEffect } from "react"; 
import { useState } from "react"
import Axios from "axios"; 
import Navbar from "../../NavBar"; 

const Classwork = () => { 
    const [showClasses, setClasses] = useState([]);  
    const [input, setInput] = useState({username : sessionStorage.username})

    const Classes = async () => {   
        Axios({ 
            method: "POST",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/classes',  
            data: input
            }).then((res) => {
            console.log(res.data);
            setClasses(res.data); 
        });
    } 

    useEffect(() => { 
        Classes();
    }, 1)

    return( 
        <div> 
            <div className="UI">
                <Navbar />  
            </div>
            <div className="classworkContent"> 
                <h1>Hello </h1> 
                <div> 
                    Classes 
                    <div> 
                    {showClasses ? <ul>{showClasses.map((item)=><li key={item._id}>{item.classes}: {item.cost}</li>)}</ul> : null}
                    </div> 
                    <div className="addClass"> 
                        <button>+</button>
                    </div>
                </div>
            </div> 
        </div>
    )
} 

export default Classwork;