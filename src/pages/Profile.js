import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './style/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfos: {
        image: '',
        name: '',
        email: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      userInfos: user,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  render() {
    const { userInfos } = this.state;

    return (
      <div className="page-profile" data-testid="page-profile">
        <div className="profile-container">
          <div className="profile-initial">
            <FaUserCircle className="profile-icon" />
            <button
              className="profile-button"
              type="button"
              onClick={ this.handleClick }
            >
              Editar Perfil
            </button>
          </div>
          <label htmlFor="profile-name" className="profile-label">
            Nome
            <p className="user-infos" id="profile-name">
              {userInfos.name}
            </p>
          </label>
          <labe
            htmlFor="profile-email"
            className="profile-label"
          >
            E-mail
            <p id="profile-email">{userInfos.email}</p>
          </labe>
          <label
            htmlFor="profile-email"
            className="profile-label"
          >
            Descrição
            <p id="profile-description">{userInfos.description}</p>
          </label>
        </div>
      </div>
    );
  }
}

export default Profile;
