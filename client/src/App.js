import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./Home";
import Admin from "./Admin"; 
import AdminSignedIn from "./AP"

const App = () => (
    <Router>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/admin/login' element={<Admin/>}/>        
            <Route path='/admin' element={<AdminSignedIn/>} />
        </Routes>
    </Router>
)

export default App;