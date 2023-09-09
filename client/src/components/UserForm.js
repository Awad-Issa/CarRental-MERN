import React, { useState } from 'react'
import axios from 'axios';
export default (props) => {
    const {
        initialFirstName,
        initialLastName,
        initialAddress,
        initialEmail,
        errors,
        onSubmitProp } = props;

    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [email, setEmail] = useState(initialAddress);
    const [address, setAddress] = useState(initialEmail);
  


    const DataUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp(DataUser);
        setFirstName("");
        setLastName("");
        setEmail("");
        setAddress("");
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>First Name</label><br />
                <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </p>
            <p>
                <label>Last Name</label><br />
                <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </p>

            <p>
                <label>Email</label><br />
                <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            </p>
            <p>
                <label>Addres</label><br />
                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
            </p>
            <input type="submit" />
            {errors.map((err, index) => <p style={{ color: 'red' }} key={index}>{err}</p>)}
        </form>
    )
}

