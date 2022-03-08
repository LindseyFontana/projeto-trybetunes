import React from 'react';
import { getUser } from './services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isRender: false,
    };
  }

  componentDidMount() {
    getUser()
      .then((user) => {
        this.setState({
          name: user.name,
          isRender: true,
        });
      });
  }

  render() {
    const { isRender, name } = this.state;
    return (
      <header data-testid="header-component">
        <p>HEADER</p>
        { isRender && <p>{ name }</p> }
      </header>
    );
  }
}

export default Header;
