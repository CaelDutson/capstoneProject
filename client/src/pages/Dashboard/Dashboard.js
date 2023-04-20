import React from "react";
import { useState } from "react";

import Courses from "./Courses.js";
import Users from "./Users.js"; 
import Navbar from "../../NavBar.js";

const Dashboard = () => {
    const [page, setPage] = useState();

    const cur = () => {
        switch (page) {
            case 'users':
                return <Users/>
            default:
                return <Courses/>
        }
    }

    console.log('dsfa')

    return (
        <div> 
            <Navbar /> 
            <div className="classStuff">
                <div onClick={() => setPage('courses')}>Courses</div>
                <div onClick={() => setPage('users')}>Users</div> 
            </div>
            <div id="Content">
                {cur()}
            </div> 
            
        </div>
    )
}

export default Dashboard;