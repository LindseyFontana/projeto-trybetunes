import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { PropTypes } from 'prop-types';
import Button from './components/Button';
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
      <div className="page-profile">
        <div className="profile-container">
          <div className="profile-image-container">
            <FaUserCircle className="profile-icon" />
            <Button
              buttonType="button"
              testId=""
              name="edit-button"
              text="Editar Perfil"
              clickFunction={ this.handleClick }
            />
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
            <p
              id="profile-email"
              className="user-infos"
            >
              {userInfos.email}
            </p>
          </labe>
          <label
            htmlFor="profile-description"
            className="profile-label"
          >
            Descrição
            <p
              className="user-infos"
              id="profile-description"
            >
              {userInfos.description}
            </p>
          </label>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
