import {Link} from 'react-router-dom'

export default function Navbar() { 
    return ( 
        <div className='navbar'> 
            <Link to="/">Home</Link>
            <Link to='/admin/login'>Admin Login</Link> 
            <Link to='/admin'>Admin Page</Link> 
        </div>
    )
}