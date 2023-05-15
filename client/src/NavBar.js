import { Link } from 'react-router-dom'
import React from 'react';

import IsLogged from './utils/IsLogged.js'

export default function Navbar() { 
    const [status, setStatus] = IsLogged()

    const usage = () => {
        sessionStorage.removeItem('data') 
        sessionStorage.removeItem('name');
        setStatus(false)
    }
    
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "15%";
    } 
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0px";
    }  
    
    const logOut = () => { 
        sessionStorage.removeItem("data") 
        sessionStorage.removeItem("username")
    }
    
    return ( 
        
            <div>
                <div id="mySidenav" className='navbar'> 
                    <a className='closeNav' onClick={closeNav}>&#9776;</a>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/classwork'>Classwork</Link> 
                    <Link to='/dashboard'>Dashboard</Link>
                    {status ? <Link to="/login" onClick={usage}>Signout</Link> : <Link to='/login'>Login</Link>}
                    <button>User tbd</button>
                </div>  
                <div className='openNav'>
                    <span onClick={openNav}>&#9776;</span> 
                </div>
            </div>
        
    )
}