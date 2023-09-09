import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Empty = () => {


const navigate = useNavigate()

    useEffect(() => {
        navigate("/home")
    }, []);


    return (
        <>


            <h1>Hi</h1>




        </>
    );
};

export default Empty;




