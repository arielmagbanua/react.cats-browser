import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';

import { getBreedImage } from '../../domain/use-cases/CatBreedsUseCases';
import Breed from '../../domain/entities/Breed';
import BreedImage from '../../domain/entities/BreedImage';

/**
 * The cat breed details page.
 * This page component display the details of cat breed with the image of the cat.
 */
const CatBreedDetailsPage: React.FC = () => {
  // local state for the breed of the cat image
  const [breed, setBreed] = useState<Breed | null>(null);

  // hook for image id url params
  const { id } = useParams<{id: string}>();

  // hook for navigation history
  const history = useHistory<History>();

  useEffect(() => {
    getBreedImage.execute(id)
      .then((breedImage: BreedImage) => {
        if (breedImage.breeds !== undefined) {
          setBreed(breedImage.breeds[0]);
        }
      });
  }, [id]);

  const goBack = () => {
    const breedParam = breed ? `?breed=${breed.id}` : '';

    history.push({
      pathname: '/',
      search: breedParam
    });
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
            { breed && breed.name }
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted" as="h5">
            Origin: { breed && breed.origin }
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted" as="h6">
            { breed && breed.temperament }
          </Card.Subtitle>
          <Card.Text>
            { breed && breed.description }
          </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </Container>
  );
}

export default CatBreedDetailsPage;
