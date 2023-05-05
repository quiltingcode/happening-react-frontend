import styles from "../styles/EditDeleteDropdown.module.css";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref ) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const EditDeleteDropdown = ({handleEdit, handleShow}) => {
    
    return (
      <>
        <Dropdown className="ml-auto" drop="right">
          <Dropdown.Toggle as={ThreeDots} />

          <Dropdown.Menu
            className="text-center"
            popperConfig={{ strategy: "fixed" }}
          >
            <Dropdown.Item
              className={styles.DropdownItem}
              onClick={handleEdit}
              aria-label="edit"
            >
              <i className="fas fa-pencil" />
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.DropdownItem}
              onClick={handleShow}
              aria-label="delete"
            >
              <i className="far fa-trash-alt" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </>
    );
  };
  
  