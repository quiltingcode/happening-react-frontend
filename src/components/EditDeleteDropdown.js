// CSS imports
import styles from "../styles/EditDeleteDropdown.module.css";
// React imports
import React from "react";
import { useHistory } from "react-router";
// Bootstrap imports
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
  ThreeDots.displayName = "ThreeDots";

  // Edit and Delete menu for events, comments, and reviews
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

  // Edit menu for profiles
  export function ProfileEditDropdown({ id, handleShow, handlePasswordModalShow }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={ThreeDots} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-pencil" /> Edit profile
          </Dropdown.Item>

          <Dropdown.Item
            onClick={handleShow}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" />
            Change username
          </Dropdown.Item>

          <Dropdown.Item
            onClick={handlePasswordModalShow}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
            Change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  
  