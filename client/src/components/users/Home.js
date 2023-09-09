// ##// ##// ##
import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { useCookies } from "react-cookie";
import {Button, Container, Row, Col, Navbar, Nav, Card, NavDropdown} from 'react-bootstrap';





const Home = () => {
    const [adminUser, setSAdminUser] = useState({});

    const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [cars, setCars] = useState([]);
  const [loaded, setLoaded] = useState(1);
  // console.log(cookies);
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
      // console.log("First Status",user.firstName);
      data.user ?  setUsername(user.firstName) : setUsername('')
      data.user ?  setUserLastName(user.lastName) : setUserLastName('')
      // data.user ?  setUserId(user.UserId) : setUserId('')
        data.user ? setUserId(user._id) : setUserId('');

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
            <>
                <Navbar bg="dark" variant="dark" className="p-3">
                    <Container>
                        <Navbar.Brand href="#">
                            <img
                                // src="https://media.istockphoto.com/id/523002801/photo/traffic-on-the-gardiner-express.jpg?s=612x612&w=0&k=20&c=3VhrrCf-0jz_zXkxasSA0hdh8g35f5jpRZxeuJ0cTDI="
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
                <div
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1693442810562-458bca9bd7c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&')",
                        height: 600,
                        backgroundRepeat: "round",
                    }}
                >
                    <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 600 }}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div style={{ textAlignLast: "center" }} className="text-white">
                                <h2 style={{ color: "lightgray", fontFamily: "-moz-initial", fontSize: "xxx-large" }}>
                                    Car renting shaped to your life!
                                </h2>
                                <br />

                                <input style={{ color: "lightgrey" }} type="search" name="" id="" placeholder="Search for a car" />

                            </div>
                        </div>
                    </div>
                </div>
            </>
                {/*<img src="data:image/jpeg;base64,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"/>*/}







        <Container>
            

            <br/>
            <br/>
            {/*<div style={{fontFamily:"serif" , textAlignLast:"center" ,textAlign: "center", padding: "30px"}}><hr/>From:*/}
            {/*<input type="date" name="" id="" style={{marginRight:"30px"}}/>To:*/}
            {/*<input type="date" name="" id=""/>*/}
            {/*    <hr/>*/}
            {/*</div>*/}

            <Row>
                <Col className="home_page">
                    <h4>
                        {" "}
                        {/*Search for a car <span>{username}</span>*/}
                    </h4>
                    <br/>


                </Col>
            </Row>


            <Row>
                {cars.map((car) => (
                    <Col style={{textAlign: "center"}} xs={12} sm={6} md={4} lg={3} key={car.id}>
                        <Card style={{ width: '18rem',  }}>
                            <Card.Img variant="top" src={car.image} style={{ height: '200px' }} />
                            <Card.Body>
                                <Card.Title>{car.type}</Card.Title>
                                <Card.Text>{car.year}</Card.Text>
                                <hr/>
                                <Button variant="primary">
                                    <Link to={"/car/" + car._id} style={{ color: "white", textDecoration: "none" }}>
                                        Book Now
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                        <br/>
                    </Col>
                ))}
            </Row>


            <ToastContainer />
        </Container><br/><br/>
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




