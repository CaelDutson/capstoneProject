import {Link} from 'react-router-dom'

export default function Navbar() { 
    return ( 
        <>
            <Link to="/">Home</Link>
            <Link to='/login'>Admin</Link>
            <Link to='/signup'>Signup</Link>
            <Link to='/admin'>Admin Page</Link> 
        </>
    )
}