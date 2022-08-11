import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { getUser } from '../../services/userAPI';
import Context from '../../contextAPI/Context';
import Loading from '../Loading';
import Logo from './Logo';
import '../style/Header.css';
import NavegationBar from './NavegationBar';

function Header() {
  const [nameIsRender, setNameIsRender] = useState(false);
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    setNameIsRender(true);
  }, []);

  return (
    <header data-testid="header-component" className="header-component">
      <div className="user-header">
        <Logo component="header" />
        { nameIsRender
          ? (
            <div className="user">
              <FaUserCircle className="user-icon" />
              <p
                data-testid="header-user-name"
                className="user-name"
              >
                { user.name }
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
