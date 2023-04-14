import { useState } from "react";

const IsLogged = () => {
    const [status, setStatus] = useState(sessionStorage.getItem('data'))

    return [status, setStatus]
}

export default IsLogged;

// might just make a useLoginStatus cause it is easier