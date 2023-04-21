import React from "react";
import { useState, useEffect } from "react";

import Button from "../../components/ui/Button.js";

const Register = (val) => (
    <Button data={val}/>
);

const Unregister = (val) => (
    <Button data={val}/>
);

const CourseButton = ({ id, students }) => {
    const [type, setType] = useState()

    useEffect(() => {
        if (students == null || students.length < 30) {
            setType('Register')
        } else {
            setType('Unregister')
        }
    }, [])

    const HandleButton = () => {
        if (type == 'Register') {
            // register function
            setType('Unregister')
        } else {
            // unregister function
            setType('Register')
        }
    }
    const TypeButton = () => (
        <button key={id} onClick={HandleButton}>{type}</button>
    )

    console.log(type)

    return (
        <>
            {TypeButton()}
        </>
    )
};

export default CourseButton;