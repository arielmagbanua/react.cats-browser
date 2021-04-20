import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status"/>
    </div>
  );
}

export default LoadingSpinner;
