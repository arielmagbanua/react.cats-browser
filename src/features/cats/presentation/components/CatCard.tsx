import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styles from './CatCard.module.scss';

interface IProps {
  id: string
  imageUrl: string,
}

/**
 * Cat card component.
 * This component renders the cat card which contains the image of the card and view details button.
 *
 * @param id The id of the cat breed.
 * @param imageUrl The image url of the cat.
 */
const CatCard: React.FC<IProps> = ({ id, imageUrl }) => {
  return (
    <Col md={3} className="col-12 mb-3">
      <Card className={styles['image-card']}>
        <Card.Img variant="top" src={imageUrl} width="300" height="300"/>
        <Card.Body>
          <Row className="px-3">
            <Link to={`/${id}`} className="btn btn-primary">View Details</Link>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CatCard;
