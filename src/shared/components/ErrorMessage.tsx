import React from 'react';
import { Alert } from 'react-bootstrap';

interface IProps {
  title: string,
  message: string
}

/**
 * Error message component.
 * This component renders bootstrap alert message for displayin errors.
 *
 * @param title The title of the error.
 * @param message The message of the error.
 */
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
