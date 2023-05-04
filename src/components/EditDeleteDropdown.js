import styles from "../styles/EditDeleteDropdown.module.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const EditDeleteDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={ThreeDots} id="dropdown-custom-components">
          Custom toggle
        </Dropdown.Toggle>

        <Dropdown.Menu
            className="text-center"
            popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item eventKey="1">Red</Dropdown.Item>
          <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Orange
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  
  