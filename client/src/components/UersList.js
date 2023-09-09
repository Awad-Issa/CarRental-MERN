import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';

// import { Button } from '@material-ui/core';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";

const UserList = (props) => {
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState("")
    useEffect(() => {

        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <p> Hello asdnaskdn </p>
            {users.map((user, i) =>
                <p key={i}>
                    {user.lastName}, {user.firstName}
                    <Link to={"/users/" + user._id + "/edit"}>
                        <Button variant="contained" color="info">
                            Edit
                        </Button>
                    </Link>

                </p>
            )}
        </div>
    )
}

export default UserList;

