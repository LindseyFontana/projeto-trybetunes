import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './pages/Loading';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      nameIsRender: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      nameIsRender: true,
    });
  }

  render() {
    const { nameIsRender, name } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        <nav>
          <Link className="link" data-testid="link-to-search" to="/search"> Search </Link>
          <Link
            className="link"
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
        { nameIsRender
          ? (
            <p
              data-testid="header-user-name"
              className="login"
            >
              { name }
            </p>
          )
          : <Loading />}
      </header>
    );
  }
}

export default Header;
