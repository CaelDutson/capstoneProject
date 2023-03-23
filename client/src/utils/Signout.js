import React from "react";
import { Link } from "react-router-dom";

const Signout = () => {
    const usage = () => {
        sessionStorage.removeItem('data')
    }

    return (
        <Link to="/login" onClick={usage}>Signout</Link>
    )
}

export default Signout;