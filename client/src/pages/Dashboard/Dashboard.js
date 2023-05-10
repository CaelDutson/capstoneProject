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
            case 'Admin':
                return <Users/> 
            case 'Messages': 
                return <Messaging/>
            case 'My Courses':
                return <MyCourses/>;
            default:
                return <Courses/>
        }
    }

    const activateTab = (e) => {
        // Get the parent element then search
        // which child element has the class name
        // 'activated'
        let tab = e.target
        let tabParent = tab.parentElement;
        let oldTab = tabParent.querySelector('.activated');
        
        oldTab.classList.remove('activated')
        tab.classList.add('activated')

        setPage(tab.innerText)
    } 

    return (
        <div> 
            <Navbar /> 
            <div className="tabs">
                <div className="tab-wrapper">
                    <div className="tab activated" onClick={(e) => activateTab(e)}>Courses</div>
                    <div className="tab" onClick={(e) => activateTab(e)}>My Courses</div>
                    <div className="tab" onClick={(e) => activateTab(e)>Admin</div>  
                    <div className="tab" onClick={(e) => activateTab(e)}>Messages</div>
                </div>
            </div>
            <div id="Content"> 
                {currentPage()}
            </div> 
        </div>
    )
}

export default Dashboard;