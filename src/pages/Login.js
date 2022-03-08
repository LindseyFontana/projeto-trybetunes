import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-login">
        <form>
          <fieldset>
            <input
              type="text"
              name="name"
              data-testid="login-name-input"
              onChange={ this.validateInputName }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
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
            {isLoading && <Loading /> }
            {startRedirecting && <Redirect to="/search" /> }
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
