import { useState } from "react";

const useHandleInput = () => {
    const [input, setInput] = useState({});

    function handleInput(props) {
        setInput({...input, [props.target.name]: props.target.value})
    }

    return [input, handleInput]
}

export default useHandleInput;