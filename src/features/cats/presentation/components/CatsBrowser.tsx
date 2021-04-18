import React from 'react';
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import CatCard from "./CatCard";

class CatsBrowser extends React.Component<any, any> {
  render() {
    return (
      <>
        <br/>
        <Row>
          <Col md={3} sm={6} className="col-12">
            <Form.Group controlId="breed">
              <Form.Label>Breed</Form.Label>
              <Form.Control as="select" className="form-select">
                // TODO: Populate dynamically the breeds
                <option>Breed 1</option>
                <option>Breed 2</option>
                <option>Breed 3</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <br/>
        <Row>
          // TODO: Populate the dynamically the available images for the breed
          <CatCard id="awts" imageUrl="https://cdn2.thecatapi.com/images/hBXicehMA.jpg"/>
        </Row>
        <div className="d-flex justify-content-center">
          // TODO: Create load more mechanism to load more items.
          <Button variant="success">Load More</Button>
        </div>
      </>
    );
  }
}

export default CatsBrowser;
