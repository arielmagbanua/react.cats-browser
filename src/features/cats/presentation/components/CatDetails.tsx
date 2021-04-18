import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Container } from "react-bootstrap";

interface Params {
  id: string
}

const CatCard: React.FC = () => {
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
          <Button variant="primary" onClick={goBack}>Back</Button>
        </Card.Header>
        <Card.Img variant="top" src={`https://cdn2.thecatapi.com/images/${id}.jpg`}/>
        <Card.Body>
          <Card.Title as="h4">Foo Breed</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" as="h5">Origin: United States</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted" as="h6">Intelligent, Interactive, Lively, Playful, Sensitive</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CatCard;
