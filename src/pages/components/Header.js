import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import Context from '../../contextAPI/Context';
import Loading from './Loading';
import Logo from './Logo';
import '../style/Header.css';
import NavegationBar from './NavegationBar';

function Header() {
  const [nameIsRender, setNameIsRender] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    setNameIsRender(true);
  }, []);
  return (
    <header className="header-component">
      <div className="header">
        <Logo component="header" />
        { nameIsRender
          ? (
            <div className="user">
              <FaUserCircle className="user-icon" />
              <p
                className="user-name"
              >
                { user.name !== '' && user.name !== undefined
                  ? user.name
                  : null}
              </p>
            </div>
          )
          : <Loading />}
      </div>
      <NavegationBar />
    </header>
  );
}

export default Header;
