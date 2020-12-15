import React, { PureComponent, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from 'recharts';

import { 
  Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button 
} from 'react-bootstrap';

class App extends React.Component {
  state = {
    clicked: false,
    data: [],
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  clickHandler() {
    fetch('/time').then(res => res.json()).then(data => {
      this.setState({"data": data.data});
    });
    this.setState({'clicked': true});
  }

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
                onClick={() => this.setState({'clicked': false})}
                >
                  Home
              </Nav.Link>
            </Nav>
              <Button 
                variant="outline-success" 
                onClick={() => this.clickHandler()}
                >
                Visualize
              </Button>
          </Navbar.Collapse>
        </Navbar>
        <p>
          This simple tool helps to visualize important features for a SRH/GBV digital content.
          <br/>
          It takes the Link as input and displays the features.
        </p>
        <Form inline>
          <FormControl type="text" placeholder="Link" onSubmit={() => this.s} />
          <Button variant="primary">Visualize</Button>
        </Form>
        {
          this.state.clicked ?
          <div className={"barChart"}>
          <BarChart
            
            width={800}
            height={500}
            data={this.state.data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0088A9" />
            
          </BarChart>
          </div>
          :
          null
          }
      </Fragment>
      );
  
  }
}


export default App;