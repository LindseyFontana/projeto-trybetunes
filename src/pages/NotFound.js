import React from 'react';
import Logo from './components/Logo';
import './style/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found">
        <Logo component="notFound" />
        <div className="text-not-found">
          <p className="ops">Ops!</p>
          <p className="message-not-found">
            Page not found.
          </p>
        </div>
      </div>
    );
  }
}

export default NotFound;
