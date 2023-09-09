import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";
    
const Update = (props) => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(res => {
                setFirstName(res.data.user.firstName);
                setLastName(res.data.user.lastName);
                setAddress(res.data.user.address);
                setEmail(res.data.user.email);
            })
    }, []);
    console.log(firstName);

    const DataUser = {
        firstName : firstName, 
        lastName : lastName , 
        email : email  , 
        address : address 
    }
    
    const updateUser = e => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/users/' + id , DataUser)
            .then(res => console.log(res))
            .catch(err => console.error(err));
            navigate('/')
    }
    
    return (
        <div>
            <h1>Update a User</h1>
            <form onSubmit={updateUser}>
            <p>
                <label>First Name</label><br/>
                <input type="text" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
            </p>

            <p>
                <label>Email</label><br/>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </p>
            <p>
                <label>Addres</label><br/>
                <input type="text" onChange={(e)=>setAddress(e.target.value)} value={address}/>
            </p>
            <input type="submit"/>
        </form>
        </div>
    )
}
    
export default Update;

