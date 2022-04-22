import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

class NavegationBar extends React.Component {
  render() {
    return (
      <nav className="navegation">
        <Link
          className="link link-search"
          data-testid="link-to-search"
          to="/search"
        >
          Search
        </Link>
        <Link
          className="link link-favorite"
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favorite Music
        </Link>
        <Link
          className="link"
          data-testid="link-to-profile"
          to="/profile"
        >
          Profile
        </Link>
      </nav>
    );
  }
}

export default NavegationBar;
