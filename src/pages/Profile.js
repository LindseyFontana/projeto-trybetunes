import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
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
    // const user = this.context;
    return (
      <div className="page-profile" data-testid="page-profile">
        {/* {!user && <Redirect to="/" />} */}
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

export default Profile;
