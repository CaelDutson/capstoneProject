import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./Home";
import Login from "./pages/Login/Login.js"
import Signup from "./pages/Signup/Signup.js";

const App = () => (
    <Router>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>   
            <Route path='/signup' element={<Signup/>}/>   
        </Routes>
    </Router>
)

export default App;