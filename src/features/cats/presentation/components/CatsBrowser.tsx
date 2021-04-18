import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';

import CatCard from './CatCard';
import Breed from '../../data/models/Breed';
import { BreedsContext, SelectBreedContext } from '../../providers/BreedsProvider';

// TODO: Populate the dynamically the available images for the breed
// TODO: Create load more mechanism to load more items.

const CatsBrowser: React.FC = () => {
  const breeds = useContext<Breed[]>(BreedsContext);
  const setSelectedBreed = useContext<Dispatch<SetStateAction<Breed | undefined>> | null>(SelectBreedContext);

  const selectBreed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const breedId = e.target.value;
    const selectedBreed = breeds.find((breed: Breed) => breed.id === breedId);

    if (setSelectedBreed) {
      setSelectedBreed(selectedBreed);
    }
  }

  return (
    <>
      <br/>
      <Row>
        <Col md={3} sm={6} className="col-12">
          <Form.Group controlId="breed">
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" className="form-select" onChange={selectBreed}>
              <option>Select Breed</option>
              {
                breeds.map((breed: Breed) => (
                  <option key={breed.id} value={breed.id}>{ breed.name }</option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <br/>
      <Row>
        <CatCard id="awts" imageUrl="https://cdn2.thecatapi.com/images/hBXicehMA.jpg"/>
      </Row>
      <div className="d-flex justify-content-center">
        <Button variant="success">Load More</Button>
      </div>
    </>
  );
}

export default CatsBrowser;
