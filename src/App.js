import React, { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Navbar, Nav, Form, Button } from "react-bootstrap";

class App extends React.Component {
  state = {
    clicked: false,
    pageName: "",
    data: [],
  };

  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";

  handleChange = (event) => {
    this.setState({ pageName: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageName: this.state.pageName }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => console.log(error));
    this.setState({ clicked: true });
  };

  render() {
    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">GBV-SRH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="#home"
                onClick={() => this.setState({ clicked: false })}
              >
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className={"description"}>
          <p>
            This simple tool helps to visualize important features for a SRH/GBV
            digital content.
            <br />
            It takes the Link as input and displays the features.
          </p>
        </div>
        <div className={"description"}>
          <Form inline onSubmit={this.handleSubmit}>
            <input
              name="page_name"
              placeholder="page name"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button type="submit" variant="primary">
              Visualize
            </Button>
          </Form>
        </div>
        {this.state.clicked ? (
          <div className={"barChart"}>
            <BarChart width={730} height={250} data={this.state.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="keyword" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="woe" fill="#8884d8" />
              <Bar dataKey="iv" fill="#82ca9d" />
            </BarChart>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default App;
