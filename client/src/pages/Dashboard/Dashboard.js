import React from "react";
import { useState } from "react";

import Courses from "./Courses.js";
import Users from "./Users.js"; 
import Navbar from "../../NavBar.js"; 
import Messaging from "./Messaging.js"
import MyCourses from "./MyCourses.js";


const Dashboard = () => {
    const [page, setPage] = useState('Courses');

    const currentPage = () => {
        switch (page) {
            case 'admin':

                return <Users/> 
            case 'messaging': 
                return <Messaging />

                return <Users/>
            case 'My Courses':
                return <MyCourses/>;

            default:
                return <Courses/>
        }
    }

    console.log("In " + page)
    return (
        <div> 
            <Navbar /> 
            <div className="classStuff">
                <div onClick={() => setPage('Admin')}>Admin</div>  
                <div onClick={() => setPage('messaging')}>Messages</div>  
                <div onClick={() => setPage('Courses')}>Courses</div>
                <div onClick={() => setPage('My Courses')}>My Courses</div>
            </div>
            <div id="Content"> 
                {currentPage()}
            </div> 
        </div>
    )
}

export default Dashboard;