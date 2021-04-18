import React from 'react';
import logo from '../../../../logo.svg';
import { Navbar } from 'react-bootstrap';

const CatsNavbar: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Cats Browser
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default CatsNavbar;
