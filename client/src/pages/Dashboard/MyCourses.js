import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import List from "./List";

const MyCourses = () => {
    let [data, setData] = useState([])
    
    
    useEffect(() => {
        Axios({ 
            method: "GET",
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem("data")
            },
            withCredentials: true, 
            url: '/getRegisteredCourses', 
        }).then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div className="courseList">  
            <div>
                <>gyu</>
                <List list={data} /> 
            </div>
        </div>
    )
}

export default MyCourses;