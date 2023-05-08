import React from "react";
import Axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import List from "./List"; 
import Navbar from "../../NavBar";

const Courses = () => {
    let [data, setData] = useState([])

    useEffect(() => {
        Axios({ 
            method: "GET",
            headers: {
                Authorization: 'bearer ' + sessionStorage.getItem("data")
            },
            withCredentials: true, 
            url: '/getCourses', 
        }).then((res) => (
            setData(res.data)
        )).catch((err) => {
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
                    </tr>
                </thead>
                <tbody>
                    <List list={data}/> 
                </tbody>
            </table>
        </div>
    )
}

export default Courses;