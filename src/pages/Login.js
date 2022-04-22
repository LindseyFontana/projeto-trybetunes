import React from 'react';
import { BsHeadphones } from 'react-icons/bs';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './style/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isButtonDesabled: true,
      isLoading: false,
      startRedirecting: false,
    };
  }

  validateInputName = ({ target }) => {
    const { value } = target;
    const minNameSize = 3;
    if (value.length >= minNameSize) {
      this.setState({
        userName: value,
        isButtonDesabled: false,
        isLoading: false,
      });
    } else {
      this.setState({
        userName: value,
        isButtonDesabled: true,
        isLoading: false,
      });
    }
  }

  render() {
    const { startRedirecting, isLoading, userName, isButtonDesabled } = this.state;

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
                <input
                  type="text"
                  data-testid="login-name-input"
                  className="login-name-input"
                  placeholder="Nome"
                  onChange={ this.validateInputName }
                />
                <input
                  type="text"
                  data-testid="login-name-input"
                  className="login-name-input"
                  placeholder="Senha"
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  className="login-submit-button"
                  disabled={ isButtonDesabled }
                  onClick={ (event) => {
                    event.preventDefault();
                    this.setState({ isLoading: true });
                    createUser({ name: userName })
                      .then(() => this.setState(
                        { isLoading: false, startRedirecting: true },
                      ));
                  } }
                >
                  Entrar
                </button>
              </>
            )}
          {startRedirecting && <Redirect to="/search" /> }
        </fieldset>
      </form>
    );
  }
}

export default Login;
