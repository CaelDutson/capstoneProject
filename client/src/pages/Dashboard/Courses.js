import React from "react";
import Axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import List from "./List";

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
        <div>
            <List list={data} />
        </div>
    )
}

export default Courses;