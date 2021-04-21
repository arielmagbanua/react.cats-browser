import React from 'react';
import { Navbar } from 'react-bootstrap';

import logo from '../../../../logo.svg';
import { useSelectedBreedContext } from '../providers/BreedsProvider';

/**
 * The Navbar component.
 * This displays the name of the currently selected breed.
 */
const CatsNavbar: React.FC = () => {
  const selectedBreed = useSelectedBreedContext();

  let title = 'Cats Browser';

  if (selectedBreed) {
    title += ` | ${selectedBreed.name}`;
  }

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
          { title }
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default CatsNavbar;
