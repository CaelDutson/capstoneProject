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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Students</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <List list={data}/> 
                </tbody>
            </table>
        </div>
    )
}

export default MyCourses;