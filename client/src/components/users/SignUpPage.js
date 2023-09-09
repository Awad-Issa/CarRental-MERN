import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import '../App.css'

export default function SignUpPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right",
        });
    const payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword

    }
    const handelSignUp = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:8000/api/users/register',
            payload,
            { withCredentials: true })
        try {
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/home");
                }, 1000)
            }
            else {
                handleError(message);
                // errors.push(message)
                //  console.log(err);
            }
        }

        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="login-form text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handelSignUp}>
                <p>
                    <label>FirstName</label><br />
                    <input type="text"
                    required
                        onChange={(e) => setFirstName(e.target.value)}
                        name="first_name" />
                </p>
                <p>
                    <label>LastName</label><br />
                    <input
                        required
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        name="lastName" />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input
                        required
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />
                </p>
                <p>
                    <label>Password</label><br />
                    <input
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" name="password" />
                </p>
                <p>
                    <label>ConfirmPassword</label><br />
                    <input
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        name="confirmPassword" />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            {errors.map((err, index) => <p style={{ color: 'red' }} key={index}>{err}</p>)}

            <ToastContainer />
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
