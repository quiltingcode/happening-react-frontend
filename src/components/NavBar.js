import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/logo-transparent.png';
import brandname from '../assets/brand-transparent-cropped.png';


const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
            <img src={logo} alt="logo" height="55"/>
            <img src={brandname} alt="brandname" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link><i class="fas fa-home"></i> Home</Nav.Link>
            <Nav.Link><i class="fas fa-sign-in-alt"></i> Sign in</Nav.Link>
            <Nav.Link><i class="fas fa-user-plus"></i> Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar