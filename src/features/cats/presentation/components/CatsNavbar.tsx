import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';

import logo from '../../../../logo.svg';
import Breed from '../../data/models/Breed';
import { SelectedBreedContext } from '../providers/BreedsProvider';

const CatsNavbar: React.FC = () => {
  const selectedBreed = useContext<Breed | undefined | null>(SelectedBreedContext);

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
