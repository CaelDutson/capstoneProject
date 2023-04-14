import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import PrivateRoute from "./utils/PrivateRoute.js";

import Home from "./Home";
import Login from "./pages/Login/Login.js"
import Signup from "./pages/Signup/Signup.js";
import AdminSignedIn from "./AP"
import Navbar from './NavBar';

const App = () => (
    <Router>
        <div className='navbar'> 
            <Navbar />
        </div>
        <content>
            <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>   
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/admin' element={
                    <PrivateRoute>
                        <AdminSignedIn/>
                    </PrivateRoute>
                }/>
            </Routes>
        </content>
    </Router>
)

export default App;