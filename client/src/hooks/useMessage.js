import { useState } from "react";

const useMessage = () => {
    const [message, setMessage] = useState(null);

    const handleMessage = (props) => {
        setMessage(<h1>{props}</h1>)
    }

    return [message, handleMessage]
}

export default useMessage;