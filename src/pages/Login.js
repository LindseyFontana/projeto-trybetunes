import React, { useState, useContext, useEffect } from 'react';
import { BsHeadphones } from 'react-icons/bs';
import { Redirect } from 'react-router-dom';
import { createUser, removeUser, getUser } from '../services/userAPI';
import Context from '../contextAPI/Context';
import Loading from './Loading';
import Button from './components/Button';
import Input from './components/Input';
import './style/Login.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  // const [isButtonDesabled, setButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startRedirecting, setStartRedirecting] = useState(false);
  const { setUser } = useContext(Context);

  useEffect(() => {
    removeUser();
    setUser({});
  }, []);

  const saveName = ({ target }) => {
    const { value } = target;
    setUserName(value);
  };

  const saveEmail = ({ target }) => {
    const { value } = target;
    setUserEmail(value);
  };

  const emailIsValid = () => {
    const email = userEmail.toLowerCase();
    const isValid = email.match(/\S+@\S+\.\S+/);
    if (!isValid) return false;
    return true;
  };

  const nameIsValid = () => {
    if (userName.length >= 3) return true;
    return false;
  };

  const userIsValid = () => {
    if (!emailIsValid() || !nameIsValid()) {
      alert('Invalid data!');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const userSaved = getUser();
    setUser(userSaved);
    // setNameIsRender(true);
  }, []);

  const saveUser = (event) => {
    event.preventDefault();
    if (userIsValid()) {
      setIsLoading(true);
      createUser({ name: userName, email: userEmail })
        .then(() => {
          setUser((...prevState) => ({
            ...prevState,
            name: userName,
            email: userEmail,
          }));
          setStartRedirecting(true);
        });
    }
  };

  return (
    <form data-testid="page-login" className="page-login">
      <div className="logo-login-container">
        <p className="login-logo-up">
          Trybe
          <span><BsHeadphones className="icon-login" /></span>
        </p>
        <p className="login-logo-down">tunes</p>
      </div>
      <fieldset className="login">
        {isLoading
          ? <Loading component="login" />
          : (
            <>
              <Input
                buttonType="text"
                testId="login-name-input"
                classStyle="login-input"
                placeHolder="Name"
                onChange={ saveName }
              />
              <Input
                buttonType="text"
                testId="login-senha-input"
                classStyle="login-input"
                placeHolder="E-mail"
                onChange={ saveEmail }
              />
              <Button
                buttonType="submit"
                testId="search-artist-button"
                name="login-button"
                // isDesabled={ isButtonDesabled }
                text="Sign in"
                clickFunction={ saveUser }
              />
            </>
          )}
        {startRedirecting && <Redirect to="/search" /> }
      </fieldset>
    </form>
  );
}

export default Login;
