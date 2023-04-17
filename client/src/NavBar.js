import {Link, Switch, Route} from 'react-router-dom';
import React from 'react'; 


export default function Navbar() {  
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "15%";
    } 
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0px";
    }  
    const logOut = () => { 
        sessionStorage.removeItem("data") 
        sessionStorage.removeItem("Name")
    }
    return ( 
        <>  
            <div>
                <div id="mySidenav" className='navbar'> 
                    <a onClick={closeNav}>&#9776;</a>
                    <Link to="/">Home</Link>
                    <Link to='/adminLogin'>Admin</Link>
                    <Link to='/login'>Login</Link>  
                    <Link to='/classwork'>Classwork</Link> 
                    <button>User tbd</button> 
                    <Link to="/login"><button onClick={logOut}>Logout</button></Link>
                </div>  
                <div className='openNav'>
                    <span onClick={openNav}>&#9776;</span> 
                </div>
            </div>
        </>
    )
}