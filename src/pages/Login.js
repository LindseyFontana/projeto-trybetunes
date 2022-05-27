import React, { useState, useContext } from 'react';
import { BsHeadphones } from 'react-icons/bs';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Context from '../contextAPI/Context';
import Loading from './Loading';
import Button from './components/Button';
import Input from './components/Input';
import './style/Login.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [isButtonDesabled, setButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [startRedirecting, setStartRedirecting] = useState(false);
  const { setUser } = useContext(Context);

  const validateInputName = ({ target }) => {
    const { value } = target;
    const minNameSize = 3;
    if (value.length >= minNameSize) {
      setUserName(value);
      setButton(false);
      setIsLoading(false);
    } else {
      setUserName(value);
      setButton(true);
      setIsLoading(false);
    }
  };

  const saveUser = (event) => {
    event.preventDefault();
    setIsLoading(true);
    createUser({ name: userName })
      .then(() => {
        setButton(false);
        setUser((...prevState) => ({
          ...prevState,
          name: userName,
        }));
        setStartRedirecting(true);
      });
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
          ? <Loading />
          : (
            <>
              <Input
                buttonType="text"
                testId="login-name-input"
                classStyle="login-input"
                placeHolder="Name"
                onChange={ validateInputName }
              />
              <Input
                buttonType="text"
                testId="login-senha-input"
                classStyle="login-input"
                placeHolder="Senha"
              />
              <Button
                buttonType="submit"
                testId="search-artist-button"
                name="login-button"
                isDesabled={ isButtonDesabled }
                text="Entrar"
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
