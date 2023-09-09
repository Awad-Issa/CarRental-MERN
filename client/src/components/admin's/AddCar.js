import React, {useState} from "react";
import "../App.css"
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

const AddCar = () => {

    let navigate = useNavigate();

    const [type, setType] = useState("");
    const [year, setYear] = useState();
    const [costPerHoure, setCostPerHoure] = useState();
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);


    const onSubmitHandler = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/car/new', {
            type, year, costPerHoure, image
        })
            .then(res => {
                console.log(res);
                if (res.data && res.data.author && res.data.author.name) {
                    console.log(res.data.author.store); // Access the author's name from the response
                } else {
                    console.log("Author name not found in response.");
                }
                // Do something with the response if needed
                let _id;
                navigate("/admin/main")
            })
    }

        return (
            <div className="App">
                <header className="App-header">


                    <h1>Add new car</h1>
                    <br/>
                    <form onSubmit={onSubmitHandler}>
                        {errors.map((err, index) => <p key={index}>{err}</p>)}

                        <p>
                            <label>Car type</label><br/>
                            <input type="text" onChange={(e) => setType(e.target.value)} value={type}/>
                        </p>
                        <p>
                            <label>Car Image</label><br/>
                            <input type="text" onChange={(e) => setImage(e.target.value)} value={image}/>
                        </p>
                        <p>
                            <label>Cost per houre</label><br/>
                            <input type="number" onChange={(e) => setCostPerHoure(e.target.value)}
                                   value={costPerHoure}/>
                        </p>
                        <p>
                            <label>Car model</label><br/>
                            <input type="number" onChange={(e) => setYear(e.target.value)} value={year}/>
                        </p>

                        <input type="submit" value="Add a new car"/>
                    </form>

                    <Link to="/admin/main">Main</Link>
                </header>
            </div>

        );

}
export default AddCar;