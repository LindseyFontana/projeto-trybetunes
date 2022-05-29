import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import '../style/Header.css';

function NavegationBar() {
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);

  useEffect(() => {
    setPath(history.location.pathname);
  });

  return (
    <nav className="navegation">
      <Link
        className={
          path === '/search' || path === '/album'
            ? 'link link-active' : 'link link-search'
        }
        to="/search"
      >
        Search
      </Link>
      <Link
        className={ path === '/favorites' ? 'link link-active' : 'link link-favorites' }
        to="/favorites"
      >
        Favorite Music
      </Link>
      <Link
        className={
          path === '/profile' || path === '/profile/edit'
            ? 'link link-active' : 'link'
        }
        to="/profile"
      >
        Profile
      </Link>
    </nav>
  );
}

NavegationBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavegationBar;
