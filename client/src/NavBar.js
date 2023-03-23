import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import IsLogged from './utils/IsLogged.js'
import Signout from './utils/Signout.js'

export default function Navbar() { 
    
    const [status, setStatus] = IsLogged()

    const usage = () => {
        sessionStorage.removeItem('data')
        setStatus(false)
    }

    return ( 
        <>
            <Link to="/">Home</Link>
            {status ? <Link to="/login" onClick={usage}>Signout</Link> : <Link to='/login'>Login</Link>}
            <Link to='/signup'>Signup</Link>
            <Link to='/admin'>Admin Page</Link> 
        </>
    )
}