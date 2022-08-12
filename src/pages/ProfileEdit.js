import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import './style/ProfileEdit.css';
import { getUser, updateUser } from '../services/userAPI';
import Button from './components/Button';
import Input from './components/Input';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
    };
  }

  componentDidMount = async () => {
    const localStorage = await getUser();
    this.setState({
      ...localStorage,
    });
  }

  handleChangeInput = ({ target }) => {
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }

  validateUpdate = () => {
    const { name, email } = this.state;
    const emailLowerCase = email.toLowerCase();
    const isValid = emailLowerCase.match(/\S+@\S+\.\S+/);
    if (name.length < 3 || isValid === null) {
      alert('Invalid Data!');
      return false;
    }
    return true;
  }

  handleSubmit = () => {
    if (this.validateUpdate()) {
      updateUser(this.state);
      const { history } = this.props;
      history.push('/profile');
    }
  };

  render() {
    const { image, name, email, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <div className="profile-edit-container">
          <div className="profile-edit-image">
            <FaUserCircle className="profile-icon" />
            <Input
              classStyle="input-image"
              name="image"
              placeHolder="Insert image link"
              value={ image !== '' ? image : null }
              onChange={ this.handleChangeInput }
            />
          </div>
          <Input
            buttonType="text"
            classStyle="profile-edit-input"
            placeHolder="insert your name"
            label="Name"
            name="name"
            value={ name !== '' ? name : null }
            onChange={ this.handleChangeInput }
          />
          <Input
            buttonType="text"
            classStyle="profile-edit-input"
            placeHolder="user@user.com"
            label="E-mail"
            name="email"
            value={ email !== '' ? email : null }
            onChange={ this.handleChangeInput }
          />
          <label
            htmlFor="description"
            className="profile-edit-label"
          >
            Description
            <textarea
              className="profile-edit-input textarea-edit"
              placeholder="about me"
              id="description"
              name="description"
              value={ description !== '' ? description : null }
              onChange={ this.handleChangeInput }
              rows="5"
              cols="33"
            />
          </label>
          <div className="container-button">
            <Button
              buttonType="submit"
              testId="edit-button-save"
              name="profile-button-save"
              text="Save"
              clickFunction={ this.handleSubmit }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
