import { React } from "react";
import { Navigate } from "react-router-dom";

import IsLogged from "./IsLogged.js";

const PrivateRoute = ({ children }) => {
    const [status, setStatus] = IsLogged()
    
    return status ? children : <Navigate to='/login'/>
}

export default PrivateRoute;