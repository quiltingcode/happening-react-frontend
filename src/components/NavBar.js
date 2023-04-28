import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo-transparent.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';


const NavBar = () => {

  const currentUser = useCurrentUser();

  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = (
    <>
      <NavDropdown.Item as={Link} to="/signin">
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/signup">
        <i className="fas fa-user-plus"></i>Sign up
      </NavDropdown.Item>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
              <img src={logo} alt="logo" height="55"/>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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

            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fas fa-home"></i>Feed
            </NavLink>

            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fas fa-heart"></i>My Events
            </NavLink>

            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fas fa-star"></i>Reviews
            </NavLink>

            <NavDropdown 
              title={
                <span>
                    <i className="fas fa-user-alt ml-5"></i>
                </span>
              }
              id="basic-nav-dropdown" 
            >
              <NavDropdown.Item
                as={Link}
                to='/profile'
              >
                  Profile      
              </NavDropdown.Item>

              {currentUser ? loggedInIcons : loggedOutIcons}
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