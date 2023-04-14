import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import { useState } from "react";

import Home from "./Home";
import Login from "./pages/Login/Login.js"
import Signup from "./pages/Signup/Signup.js"; 
import Classwork from "./pages/Classwork.js/Classwork"; 




const App = () => {  
    
    return( 
        
            <Router>
                <Routes>
                    <Route path='/' exact element={<Signup/>}/>
                    <Route path='/adminLogin' element={<Login/>}/>   
                    <Route path='/classwork' element={<Classwork/>}/>   
                    <Route path='/login' element={<Home />}/>
                </Routes>
            </Router> 
        
    )
}

export default App;