import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './pages/Loading';

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
      <header data-testid="header-component">
        <p>HEADER</p>
        { nameIsRender ? <p data-testid="header-user-name">{ name }</p> : <Loading />}
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorite Music </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        /favorites
      </header>
    );
  }
}

export default Header;
