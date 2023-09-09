import React from "react";
import "../App.css"
import { Link } from "react-router-dom";

const AdminMainPage = () => {

    return(
        <div className="App">
            <header className="App-header">


                <h1>Admin main page</h1>

                <Link to="/admin/addcar">Add car</Link>
                <Link to="/admin/carslist">Cars List</Link>
                <Link to="/login">Logout</Link>
                <Link to="/*">Rent requests</Link>
                <Link to="/*">Chat</Link>
            </header>
        </div>

    );
};
export default AdminMainPage;