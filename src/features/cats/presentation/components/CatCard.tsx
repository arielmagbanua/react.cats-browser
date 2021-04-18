import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap'

import styles from './CatCard.module.scss'

interface Props {
  id: string
  imageUrl: string,
}

const CatCard: React.FC<Props> = ({ id, imageUrl }) => {
  return (
    <Col md={3} className="col-12">
      <Card className={styles.card}>
        <Card.Img variant="top" src={imageUrl}/>
        <Card.Body>
          <Row>
            <Button variant="primary">View Details</Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CatCard;
