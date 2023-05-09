import React from "react";
import { Button, DropdownButton } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const Filter = React.forwardRef(({ onClick }, ref ) => (
    <DropdownButton
      title="Filter by Category"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
    </DropdownButton>
  ));

  export const CategoryFilter = () => {
    
    return (
      <>
        <Dropdown className="ml-auto" drop="right">
          <Dropdown.Toggle as={Filter}>Select Category</Dropdown.Toggle>  

          <Dropdown.Menu
            className="text-center"
            popperConfig={{ strategy: "fixed" }}
          >
            <Dropdown.Item
              onClick={() => {}}
              aria-label="category 1"
            >
              <i className="fas fa-pencil" />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {}}
              aria-label="category 2"
            >
              <i className="far fa-trash-alt" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </>
    );
  };
  