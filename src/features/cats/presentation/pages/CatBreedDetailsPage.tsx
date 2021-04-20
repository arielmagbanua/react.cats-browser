import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Container } from "react-bootstrap";

import Breed from '../../data/models/Breed';
import { SelectedBreedContext } from '../../providers/BreedsProvider';

interface Params {
  id: string
}

const CatBreedDetailsPage: React.FC = () => {
  const currentBreed = useContext<Breed | undefined | null>(SelectedBreedContext);

  const { id } = useParams<Params>();
  const history = useHistory<History>();

  const goBack = () => {
    history.push('/');
  }

  return (
    <Container>
      <br/>
      <Card>
        <Card.Header>
          <Button variant="primary" onClick={goBack}>
            Back
          </Button>
        </Card.Header>
        <Card.Img variant="top" src={`https://cdn2.thecatapi.com/images/${id}.jpg`}/>
        <Card.Body>
          <Card.Title as="h4">
            { currentBreed && currentBreed.name }
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted" as="h5">
            Origin: { currentBreed && currentBreed.origin }
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted" as="h6">
            { currentBreed && currentBreed.temperament }
          </Card.Subtitle>
          <Card.Text>
            { currentBreed && currentBreed.description }
          </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </Container>
  );
}

export default CatBreedDetailsPage;
