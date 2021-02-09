import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

 export default class Navigation extends React.Component {
 	render(){
 		return(
     	<div className="App-header">
            <Navbar color="faded" light expand="md">
                <NavbarBrand>GBV-SRH</NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/visualize">Visualize</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/about">About</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
        </div>
 		);
 	}
 }