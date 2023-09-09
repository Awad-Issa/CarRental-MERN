// ##// ##// ##
import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useCookies } from "react-cookie";
import {Button, Container, Row, Col, Navbar, Nav, Card, NavDropdown} from 'react-bootstrap';
import { Table } from 'react-bootstrap';








const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userId, setUserId] = useState("");
    const [cars, setCars] = useState([]);
    const [adminUser, setSAdminUser] = useState({});

    const [loaded, setLoaded] = useState(1);
    // console.log(cookies);

    const [type, setType] = useState("");
    const [year, setYear] = useState();
    const [costPerHoure, setCostPerHoure] = useState();
    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [rentRequests, setRentRequests] = useState([]);

    useEffect(() => {
        const verifyCookie = async () => {
            console.log(cookies);
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:8000/home", {},
                { withCredentials: true }
            );
            const { status, user } = data;
            data.user ?  setUsername(user.firstName) : setUsername('')
            data.user ?  setUserLastName(user.lastName) : setUserLastName('')
            data.user ? setUserId(user._id) : setUserId('');
            data.user ? setPassword(user.password) : setUserId('');
            data.user ? setEmail(user.email) : setUserId('');
            data.user ? setCars(user.cars) : setUserId([]);
            data.user ? setRentRequests(user.rentRequests) : setUserId([]);
            data.user ? setIsAdmin(user.isAdmin) : setUserId(false);

            console.log("Final state",status);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };



    const adminAccept = (index) => {
        console.log(rentRequests)

        const x =  [...rentRequests ]
        console.log(rentRequests)


        let updatedRentRequests = x.splice(0, 0+2);

        console.log(rentRequests)

        setRentRequests(x)

        console.log(rentRequests)


        setCars(cars.concat(updatedRentRequests))

        axios.patch('http://localhost:8000/accept/' + userId, {
            isAdmin,
            rentRequests, // Updates the rentRequests with the new value
            cars,
            email,
            password,
            userLastName,
            username
        })
        // console.log()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }



    useEffect(() => {
        axios.get('http://localhost:8000/cars')
            .then(res => {
                setCars(res.data.Cars);
                setLoaded(true);
            })
            // .catch(err => console.error("tototototooto"));
    }, [cars]);




    const deleteCar = (personId) => {
        axios.delete('http://localhost:8000/car/delete/' + personId)
            .then(res => {
                console.log("works!!")
            })
            .catch(err => console.error(err));
    }

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
                navigate("/admin")
            })
    }

    useEffect(() => {
        // Fetch author data when the component mounts
        axios.get('http://localhost:8000/findadmin')
            .then(res => {
                setSAdminUser(res.data.yazan);

            })
            .catch(error => {
                console.error("Error fetching author data:", error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/cars')
            .then(res => {
                setCars(res.data.Cars);
                setLoaded(true);
            })

            .catch(err => console.error("tototototooto"));

    }, [cars]);

    return (
        <>

            <Navbar bg="dark" variant="dark" className="p-3">
                <Container>
                    <Navbar.Brand href="#">
                        <img
                           // img src="https://media.istockphoto.com/id/523002801/photo/traffic-on-the-gardiner-express.jpg?s=612x612&w=0&k=20&c=3VhrrCf-0jz_zXkxasSA0hdh8g35f5jpRZxeuJ0cTDI="
                            height="80"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/home" className="mx-5">
                                Home
                            </Nav.Link>

                            <Nav.Link as={Link} to="/aboutus" className="mx-5">
                                About Us
                            </Nav.Link>

                            <Nav.Link as={Link} to="/contactus" className="mx-5">
                              Contact Us
                            </Nav.Link>

                            {adminUser._id == userId && (
                                <Nav.Link as={Link} to="/admin" className="mx-5">
                                    Admin
                                </Nav.Link>
                            )}
                            <NavDropdown
                                title="Company"
                                id="navbarDropdownMenuLink"
                                className="mx-5"
                            >
                                <NavDropdown.Item href="#">Blog</NavDropdown.Item>
                                <NavDropdown.Item href="#">About Us</NavDropdown.Item>
                                <NavDropdown.Item href="#">Contact us</NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="danger" onClick={Logout}>
                                LOGOUT
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>





            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Car</th>
                    <th>Confirm</th>
                    <th>Reject</th>
                </tr>
                </thead>
                <tbody>
                {rentRequests.map((request, index) => {
                    if (index % 2 === 0) {
                        return (
                            <tr key={index}>
                                <td>{request}</td>
                                <td>{rentRequests[index+1]}</td>
                                <td>
                                    <Button onClick={(e) => {
                                        adminAccept(index);
                                    }} variant="success">Accept</Button>
                                </td>
                                <td>
                                    <Button  variant="danger">Reject</Button>
                                    {/*{typeof index}*/}
                                </td>
                            </tr>
                        );
                    }
                    return null;
                })}
                </tbody>
            </Table>


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





            <Table striped bordered hover style={{textAlignLast: "center"}}>
                <thead>
                <tr>
                    <th>Car type</th>
                    <th>Car year</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {cars.map((car) => (
                    <tr key={car.id}>
                        <td>{car.type}</td>
                        <td>{car.year}</td>
                        <td>

                            <Button variant="danger" onClick={() => deleteCar(car.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>





            <footer className="bg-dark text-light py-5">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h4>About Us</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales lorem sed efficitur consequat.</p>
                        </Col>
                        <Col md={3}>
                            <h4>Links</h4>
                            <ul className="list-unstyled">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </Col>
                        <Col md={3}>
                            <h4>Contact Us</h4>
                            <p>1234 Street Name</p>
                            <p>City, State ZIP</p>
                            <p>Email: info@example.com</p>
                            <p>Phone: 123-456-7890</p>
                        </Col>
                    </Row>
                </Container>
                <div className="text-center mt-4">
                    <p>© 2023 Your Website. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Home;




