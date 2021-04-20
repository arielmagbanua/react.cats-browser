import React from 'react';
import { Alert } from 'react-bootstrap';

interface IProps {
  title: string,
  message: string
}

const ErrorMessage: React.FC<IProps> = ({ title, message }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>{ title }</Alert.Heading>
      <p>
        { message }
      </p>
    </Alert>
  );
}

export default ErrorMessage;
