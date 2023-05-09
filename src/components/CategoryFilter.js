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
        <Dropdown className="ml-auto mb-2" drop="center">
          <Dropdown.Toggle as={Filter}>Select Category</Dropdown.Toggle>  

          <Dropdown.Menu
            className="text-center"
            popperConfig={{ strategy: "fixed" }}
          >
            <Dropdown.Item
              onClick={() => {}}
              aria-label="category 1"
            >
              Category 1
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {}}
              aria-label="category 2"
            >
              Category 2
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </>
    );
  };
  