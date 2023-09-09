import "../App.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";






const CarList = () => {

    const [cars, setCars] = useState([]);
    const [loaded, setLoaded] = useState(1);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/cars')
            .then(res => {
                setCars(res.data.Cars);
                setLoaded(true);
            })

            .catch(err => console.error("tototototooto"));

    }, [cars]);


    const deleteCar = (personId) => {
        axios.delete('http://localhost:8000/car/delete/' + personId)
            .then(res => {
                console.log("works!!")
            })
            .catch(err => console.error(err));
    }
    return(

        <div className="App">
            <header className="App-header">
            <table>
                <tr>
                    <th>Car type</th>
                    <th>Car year</th>
                    <th>Action</th>

                </tr>
                {cars.map(car => (
                    <tr key={car.id}>
                        <td>{car.type}</td>
                        <td>{car.year}</td>
                        <td>
                            <button variant="contained"  onClick={(e)=>navigate("/car/edit/"+car._id)}>Edit</button>
                            <button  variant="contained" color="error"  onClick={(e)=>  deleteCar(car._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
    <Link to="/admin/main">Admin main page</Link>
                </header>
        </div>


);
};
export default CarList;