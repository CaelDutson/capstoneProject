import {Link} from 'react-router-dom'

export default function Navbar() { 
    return ( 
        <> 
            <div className='navbar'>
                <Link to="/">Home</Link>
                <Link to='/login'>Admin</Link>
                <Link to='/signup'>Signup</Link> 
            </div>
        </>
    )
}