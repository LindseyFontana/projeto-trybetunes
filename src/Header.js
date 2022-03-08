import React from 'react';
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
      </header>
    );
  }
}

export default Header;
