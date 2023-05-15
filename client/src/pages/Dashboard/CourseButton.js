import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

const Register = async (id) => {
    await Axios({ 
        method: "POST",
        headers: {
            Authorization: 'bearer ' + sessionStorage.getItem("data"),
            Class_id: id
        },
        withCredentials: true, 
        url: '/classRegister', 
    }).then((res) => {
        console.log('success!')
    }).catch((err) => {
        console.log('fail')
    })
};

const Unregister = async (id) => {
    await Axios({ 
        method: "POST",
        headers: {
            Authorization: 'bearer ' + sessionStorage.getItem("data"),
            Class_id: id
        },
        withCredentials: true, 
        url: '/classUnregister', 
    }).then((res) => {
        console.log('success!')
    }).catch((err) => {
        console.log('fail')
    })
};

const isRegistered = async (student_ids) => {
    return await Axios({ 
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            Authorization: 'bearer ' + sessionStorage.getItem("data"),
        },
        withCredentials: true, 
        data: student_ids,
        url: '/isRegistered' 
    }).then((res) => {
        return true
    }).catch((err) => {
        return false
    })
}

const CourseButton = ({ id, students }) => {
    const [type, setType] = useState()

    useEffect(() => {
        const fetchData = async () => {
            let state = await isRegistered(students)

            if (students.length < 30 && !state) {
                setType('Register')
            } else {
                setType('Unregister')
            }
        }
        
        fetchData()
    }, [])

    const HandleButton = () => {
        if (type == 'Register') {
            Register(id)
            setType('Unregister')
        } else {
            Unregister(id)
            setType('Register')
        }
    }

    const TypeButton = () => (
        <button key={id} className={type} onClick={HandleButton}>{type}</button>
    )

    return (
        <>
            {TypeButton()}
        </>
    )
};

export default CourseButton;