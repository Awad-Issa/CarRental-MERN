import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Doughnut, Bar, Line } from "react-chartjs-2";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abzugVoll: 100,
            fullScore: 86,
            dataNeu: {
                labels: ["Gesamte Punktanzahl"],
                datasets: [
                    {
                        data: [0, 0],
                        backgroundColor: ["#0069b4"],
                        hoverBackgroundColor: ["#0069b4b3"]
                    }
                ]
            },

            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July"
                ],
                datasets: [
                    {
                        label: "My First dataset",
                        backgroundColor: "#0069b4b3",
                        borderColor: "#0069b4",
                        borderWidth: 1,
                        hoverBackgroundColor: "#0069b447",
                        hoverBorderColor: "#0069b4",
                        data: [65, 59, 100, 81, 56, 55, 40]
                    }
                ]
            },

            dataZwei: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July"
                ],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "#0069b4",
                        borderColor: "#0069b4",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "#0069b447",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "#0069b447",
                        pointHoverBorderColor: "#0069b4",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        };
    }

    test = () => {
        this.setState({
            dataNeu: {
                labels: ["Gesamte Punktanzahl"],
                datasets: [
                    {
                        data: [
                            this.state.fullScore,
                            this.state.abzugVoll - this.state.fullScore
                        ],
                        backgroundColor: ["#0069b4"],
                        hoverBackgroundColor: ["#0069b4b3"]
                    }
                ]
            }
        });
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Bar
                                data={this.state.data}
                                style={{ width: "100%", height: "50%" }}
                                options={{
                                    maintainAspectRatio: true
                                }}
                            />
                        </Col>
                        <Col>
                            <Doughnut data={this.state.dataNeu} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={this.test}>
                                Primary
                            </Button>
                        </Col>
                        <Col>
                            <Line data={this.state.dataZwei} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
