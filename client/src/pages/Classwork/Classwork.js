import React, { useEffect } from "react"; 
import { useState } from "react"
import Axios from "axios"; 
import Navbar from "../../NavBar"; 

const Classwork = () => { 
    const [showClasses, setClasses] = useState([]);  
    const [data, setData] = useState([]);
    const [input, setInput] = useState({username : sessionStorage.username}); 

    const openClass = () => {
        document.getElementById("editClass").style.width = "100%"; 
        Axios({ 
            method: "GET",
            headers: {
              Authorization: 'bearer ' + sessionStorage.getItem("data") || "invalid"
            },
            withCredentials: true, 
            url: '/data',  
            }).then((res) => {
            console.log(res.data); 
            setData(res.data);
        });
    }  
    const closeClass = () => {
        document.getElementById("editClass").style.width = "0";
    } 

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
                    <div id="editClass" className="addClass"> 
                        <div className="closeClass"> 
                            <button onClick={closeClass}>Close</button>
                        </div> 
                        {data ? <ul className="classes">{data.map((item)=><li>{item.classes}: {item.cost}</li>)}</ul> : null}
                        <div className="saveClass"> 
                            <button>Save</button>
                        </div> 
                    </div>
                    </div> 
                    <div className="openClass"> 
                        <button onClick={openClass}>+</button>
                    </div>
                </div>
            </div> 
        </div>
    )
} 

export default Classwork;