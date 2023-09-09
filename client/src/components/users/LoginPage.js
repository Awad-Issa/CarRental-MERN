// ##// ##
import React, {useState} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import {useCookies} from "react-cookie";
import {ToastContainer, toast} from "react-toastify";


import '../App.css'

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [cookies, removeCookie] = useCookies([]);

    const payload = {
        email: email,
        password: password
    }
    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
        });
    const handelLogin = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post('http://localhost:8000/api/users/login', payload, {withCredentials: true})
            console.log(data);
            const {success, message} = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    console.log(cookies);
                    navigate("/home");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (err) {
            console.log(err);
            // const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            // const errorArr = []; // Define a temp error array to push the messages in
            // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            //     errorArr.push(errorResponse[key].message)
            // }
            // // Set Errors
            // setErrors(errorArr);
        }

    }
    return (
        <div className="login-form text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handelLogin}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text"
                           onChange={(e) => setEmail(e.target.value)}
                           required/>
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password" required/>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <ToastContainer/>

            <footer>
                <p>First time? <Link to="/signup">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
