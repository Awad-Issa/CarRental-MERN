import React, { useState } from 'react'
import axios from 'axios';
// import { navigate, Link } from '@reach/router';
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import { useNavigate } from "react-router-dom";

const CreateProject = (props) => {
    const navigate = useNavigate();
    //keep track of what is being typed via useState hook
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [errsubmit, setErrsubmit] = useState([])

    const usernameErrMesgs = {
        empty: "Username cannot be empty",
        minLength: "Username have to be 3 char or more"
    };
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/new', {
            name, date
        })
            .then(() => console.log(navigate('/')))
            .catch(err => {
                const errStr = err.response.data.errors.name.message
                console.log(err.response.data.errors.name.message)
                setErrsubmit(errStr);

            })
    }

    const validateUsername = (value) => {
        setName(value);
        if (value.length < 1) {
            setNameErr(usernameErrMesgs.empty);
            return false;
        } else if (value.length < 3) {
            setNameErr(usernameErrMesgs.minLength);
            return false;
        } else {
            setNameErr("");
            return true;
        }
    };

    return (
        <>


            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>Plane a new Projects ||<Link to="/"> Dashboard </Link></legend>

                    <p>

                        Projects :  <input type="text" onChange={(e) => validateUsername(e.target.value)} value={name} />
                        <p style={{ color: "red" }} > {errsubmit}  </p>
                        <p>{nameErr} </p>
                        {/* {
                    usernameErr && 
                    <p style={{color: 'red'}}>{usernameErr}</p>
                } */}
                    </p>
                    <p>
                        Due Date :  <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
                    </p>

                    <input type="submit" />
                </fieldset>
            </form>





        </>
    )
}
export default CreateProject;
