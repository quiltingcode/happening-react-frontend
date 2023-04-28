import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo-transparent.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  // const [isOpen, setIsOpen] = useState(false);

  // const onToggle = (nextShow, event, metadata) => {
  //   const isClosingPermitted = metadata.source !== 'select';
  //   const currentNextShow = nextShow ? true : !isClosingPermitted;
  //   setIsOpen(currentNextShow);
  // };


  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addEventIcon = (
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/events/create"
    >
      <i className="fas fa-plus"></i>Add Event
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/myevents"
      >
        <i className="fas fa-heart"></i>My Events
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/reviews"
        
      >
        <i className="fas fa-star"></i>Reviews
      </NavLink>

      
    </>
  );

  const loggedInDropdownIcons = (
    <>
      <NavDropdown.Item 
        as={Link} 
        to={`/profiles/${currentUser?.profile_id}`}
      >
      <Avatar src={currentUser?.profile_image} text="Profile" height={40} />

      </NavDropdown.Item>
      <NavDropdown.Item 
        as={Link} 
        to="/" 
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavDropdown.Item>
    </>
  )

  const loggedOutIcons = (
    <>    
    
    </>
  );

  const loggedOutDropdownIcons = (
    <>
      <NavDropdown.Item 
        as={Link} 
        to="/signin"

      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavDropdown.Item>
      <NavDropdown.Item 
        as={Link} 
        to="/signup"

      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavDropdown.Item>
    </>
  );

  return (
    <Navbar 
      className={styles.NavBar} 
      expand="md" 
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
              <img src={logo} alt="logo" height="55"/>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addEventIcon}
        <Navbar.Toggle 
          // onToggle={onToggle} show={isOpen}
          ref={ref}
          onClick={() => setExpanded(!expanded)} 
          aria-controls="basic-navbar-nav" 
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
            <NavDropdown 
              title={
                <span>
                    <i className="fas fa-user-alt ml-5"></i>
                </span>
              }

              id="basic-nav-dropdown" 
            >
              {currentUser ? loggedInDropdownIcons : loggedOutDropdownIcons}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar