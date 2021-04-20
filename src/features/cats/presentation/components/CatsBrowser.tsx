import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';

import Breed from '../../data/models/Breed';
import { BreedsContext, SetSelectedBreedContext, SelectedBreedContext } from '../../providers/BreedsProvider';
import CatCardList from './CatCardList';

const CatsBrowser: React.FC = () => {
  // context states
  const breeds = useContext<Breed[]>(BreedsContext);
  const setSelectedBreed = useContext<Dispatch<SetStateAction<Breed | undefined>> | null>(SetSelectedBreedContext);
  const currentBreed = useContext<Breed | undefined | null>(SelectedBreedContext);

  // local state for paging
  const [page, setPage] = useState<number>(1);

  // local state for controlling the load more button visibility
  const [loadMoreVisible, setLoadMoreVisibility] = useState<boolean>(true);

  // call back function for changing the breed
  const selectBreed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const breedId = e.target.value;
    const newSelectedBreed = breeds.find((breed: Breed) => breed.id === breedId);

    if (setSelectedBreed) {
      setSelectedBreed(newSelectedBreed);
    }
  };

  // call back function for loading the next page
  const loadMore = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    // reset page if breed was changed
    setPage(1);

    if (!currentBreed) {
      // make sure the load more button is visible
      setLoadMoreVisibility(true);
      return;
    }

    // make sure the load more button is visible
    setLoadMoreVisibility(true);
  }, [currentBreed]);

  // function for rendering the load more button
  const renderLoadMoreButton = (visible: boolean) => {
    if (visible) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" onClick={loadMore}>Load More</Button>
        </div>
      );
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
        <CatCardList breed={currentBreed} page={page} setLoadMoreVisibility={setLoadMoreVisibility}/>
      </Row>
      { renderLoadMoreButton(loadMoreVisible) }
      <br/>
    </>
  );
}

export default CatsBrowser;
