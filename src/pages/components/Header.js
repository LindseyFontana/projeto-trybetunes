import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import Logo from './Logo';
import '../style/Header.css';
import NavegationBar from './NavegationBar';

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
                  { name }
                </p>
              </div>
            )
            : <Loading />}
        </div>
        <NavegationBar />
      </header>
    );
  }
}

export default Header;
