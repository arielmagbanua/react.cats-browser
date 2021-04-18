import React from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap'
import CatCard from "./CatCard";

// TODO: Populate dynamically the breeds
// TODO: Populate the dynamically the available images for the breed
// TODO: Create load more mechanism to load more items.

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
                <option>Breed 1</option>
                <option>Breed 2</option>
                <option>Breed 3</option>
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
}

export default CatsBrowser;
