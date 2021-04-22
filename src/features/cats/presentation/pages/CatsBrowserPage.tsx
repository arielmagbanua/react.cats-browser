import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';

import Breed from '../../data/models/Breed';
import { useBreedsContext, useCurrentSelectedBreed, useNetworkErrorHappenedContext } from '../providers/BreedsProvider';
import CatCardList from '../components/CatCardList';
import { useHistory, useLocation } from 'react-router-dom';

// local hook for reading url params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

/**
 * The cats browser page component.
 * This page component holds the cat breed image card list as well as the load more button.
 */
const CatsBrowserPage: React.FC = () => {
  // context states
  const breeds = useBreedsContext();
  const [currentBreed, setSelectedBreed] = useCurrentSelectedBreed();
  const networkErrorHappened = useNetworkErrorHappenedContext();

  // local state for paging
  const [page, setPage] = useState<number>(1);

  // local state for controlling the load more button visibility
  const [loadMoreVisible, setLoadMoreVisibility] = useState<boolean>(true);

  // using the query hook for reading url params
  const queryParams = useQuery();
  // for navigation history manipulation
  const history = useHistory<History>();

  // finds the breed instance from the breed list
  const findBreed = (breedId: string):  Breed | undefined => {
    return breeds.find((breed: Breed) => breed.id === breedId);
  }

  // set selected breed and push url with params
  const setAndPushBreed = (breedId: string): void => {
    const newSelectedBreed = findBreed(breedId);

    if (setSelectedBreed) {
      setSelectedBreed(newSelectedBreed);
    }

    if (newSelectedBreed !== undefined) {
      // push and write url params for currently selected breed
      history.push({
        pathname: '/',
        search: `?breed=${newSelectedBreed.id}`
      });
    }
  }

  // call back function for changing the breed
  const onBreedChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const breedId = e.target.value;
    setAndPushBreed(breedId);
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
  const renderLoadMoreButton = (visible: boolean, networkErrorHappened: boolean) => {
    if (visible && !networkErrorHappened) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" onClick={loadMore}>Load More</Button>
        </div>
      );
    }
  }

  // function for rendering the breed dropdown
  const renderBreedDropdown = () => {
    let breedIdUrlParam = queryParams.get('breed');
    breedIdUrlParam = breedIdUrlParam ?? '';

    return (
      <Col md={3} sm={6} className="col-12">
        <Form.Group controlId="breed">
          <Form.Label>Breed</Form.Label>
          <Form.Control as="select" className="form-select" value={breedIdUrlParam} onChange={onBreedChange}>
            <option>Select Breed</option>
            {
              breeds.map((breed: Breed) => (
                <option key={breed.id} value={breed.id}>{ breed.name }</option>
              ))
            }
          </Form.Control>
        </Form.Group>
      </Col>
    );
  }

  // function for rendering the card list
  const renderCardList = () => {
    // determine if breed is preselected by using url params e.g ?breed=bamb
    let breedIdUrlParam = queryParams.get('breed');
    breedIdUrlParam = breedIdUrlParam ?? '';
    // find the breed that was specified in the url params
    const selectedBreed = findBreed(breedIdUrlParam);

    return (
      <CatCardList
        breed={currentBreed}
        preSelectedBreed={selectedBreed}
        page={page}
        setLoadMoreVisibility={setLoadMoreVisibility}
      />
    );
  }

  return (
    <>
      <br/>
      <Row>
        { renderBreedDropdown() }
      </Row>
      <br/>
      <Row>
        { renderCardList() }
      </Row>
      { renderLoadMoreButton(loadMoreVisible, networkErrorHappened) }
      <br/>
    </>
  );
}

export default CatsBrowserPage;
