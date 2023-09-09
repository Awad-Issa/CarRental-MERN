import React, {useEffect, useState} from "react";
import "../App.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditCar = () => {

    let navigate = useNavigate();
    const { id } = useParams();
    const [type, setType] = useState("");
    const [year, setYear] = useState();
    const [costPerHoure, setCostPerHoure] = useState();
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        // Fetch author data when the component mounts
        axios.get('http://localhost:8000/car/' + id)
            .then(res => {
                setType(res.data.author.type);
                setImage(res.data.author.image);
                setYear(res.data.author.year);
                setCostPerHoure(res.data.author.costPerHoure);
                console.log(res)
            })
            .catch(error => {
                console.error("Error fetching author data:", error);
            });
    }, [id]);
    const updateCar = e => {
        e.preventDefault();
        // Update author name
        axios.patch('http://localhost:8000/car/edit/' + id, {
                type,image,costPerHoure,year
            }
        )
            .then(res => {
                console.log("Car updated:", res);
                navigate ("/admin/carslist");
            })
            .catch(err => {
                console.log(err.response.data.errors);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);

            });

    }


    return (
        <div className="App">
            <header className="App-header">


                <form onSubmit={updateCar}>
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

                    <input type="submit" value="Update car"/>
                </form>

                <Link to="/admin/carslist">All cars</Link>
            </header>
        </div>

    );

}
export default EditCar;