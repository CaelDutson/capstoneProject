import React from "react";
import { useState } from "react";

import Courses from "./Courses.js";
import Users from "./Users.js"; 
import Navbar from "../../NavBar.js";
import MyCourses from "./MyCourses.js";

const Dashboard = () => {
    const [page, setPage] = useState('Courses');

    const currentPage = () => {
        switch (page) {
            case 'users':
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
            <div className="tabs">
                <div className="tab-wrapper">
                    <div className="tab" onClick={() => setPage('Courses')}>Courses</div>
                    <div className="tab" onClick={() => setPage('My Courses')}>My Courses</div>
                    <div className="tab" onClick={() => setPage('users')}>Users</div> 
                </div>
            </div>
            <div id="Content"> 
                {currentPage()}
            </div> 
        </div>
    )
}

export default Dashboard;