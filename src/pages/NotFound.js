import React from 'react';
import './style/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <p>Nenhum álbum foi encontrado</p>
      </div>
    );
  }
}

export default NotFound;
