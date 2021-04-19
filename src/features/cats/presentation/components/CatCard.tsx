import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap'

interface IProps {
  id: string
  imageUrl: string,
}

const CatCard: React.FC<IProps> = ({ id, imageUrl }) => {
  return (
    <Col md={3} className="col-12 mb-3">
      <Card className="image-card">
        <Card.Img variant="top" src={imageUrl} width="300" height="300"/>
        <Card.Body>
          <Row className="px-3">
            <Button variant="primary">View Details</Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CatCard;
