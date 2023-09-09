import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserForm from '../components/UserForm';
import UserList from '../components/UersList';
export default () => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);

    
    const CreateUser = userData  => {
        axios.post('http://localhost:8000/api/users', userData)
            .then(res => { console.log(res) })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/users')
            .then(res=>{
                setUsers(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[users]);
    return (
        <div>
           <UserForm
           onSubmitProp={CreateUser}
           initialFirstName = "" 
           initialLastName = "" 
           initialAddress = "" 
           initialEmail = "" 
           errors ={errors}
           />
           <hr/>
           {loaded && <UserList users={users}/>}
        </div>
    )
}

