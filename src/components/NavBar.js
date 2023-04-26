import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo-transparent.png';
import styles from '../styles/NavBar.module.css';


const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
            <img src={logo} alt="logo" height="55"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
            <Nav.Link><i className="fas fa-home"></i> Feed</Nav.Link>
            <Nav.Link><i className="fas fa-home"></i> My Events</Nav.Link>
            <Nav.Link><i className="fas fa-home"></i>Reviews</Nav.Link>
            <NavDropdown 
              title={
                <span>
                    <i class="fas fa-user-alt"></i>
                </span>
              }
              id="basic-nav-dropdown" 
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item><i className="fas fa-sign-in-alt"></i>Sign in</NavDropdown.Item>
              <NavDropdown.Item><i className="fas fa-user-plus"></i>Sign up</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar