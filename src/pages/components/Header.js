import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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

  // useEffect(() => {
  //   const userSaved = getUser();
  //   setUser(userSaved);
  // });

  useEffect(() => {
    const userSaved = getUser();
    setUser(userSaved);
    setNameIsRender(true);
  }, []);

  return (
    <header data-testid="header-component" className="header-component">
      <div className="user-header">
        <Link to="/">
          <Logo component="header" />
        </Link>
        { nameIsRender
          ? (
            <Link to="/profile/edit">
              <div className="user">
                <FaUserCircle className="user-icon" />
                <p
                  data-testid="header-user-name"
                  className="user-name"
                >
                  { user.name }
                </p>
              </div>
            </Link>
          )
          : <Loading />}
      </div>
      <NavegationBar />
    </header>
  );
}

export default Header;
