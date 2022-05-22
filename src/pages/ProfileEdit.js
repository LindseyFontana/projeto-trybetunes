import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
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
    console.log(target);
    this.setState((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }

  handleSubmit = () => {
    updateUser(this.state);
    const { history } = this.props;
    history.push('/profile');
  }

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
              placeHolder="Insira o link da imagem"
              value={ image !== '' ? image : null }
              onChange={ this.handleChangeInput }
            />
          </div>
          <Input
            buttonType="text"
            classStyle="profile-edit-input"
            placeHolder="Insira seu nome"
            label="Nome"
            name="name"
            value={ name !== '' ? name : null }
            onChange={ this.handleChangeInput }
          />
          <Input
            buttonType="text"
            classStyle="profile-edit-input"
            placeHolder="usuario@usuario.com.br"
            label="E-mail"
            name="email"
            value={ email !== '' ? email : null }
            onChange={ this.handleChangeInput }
          />
          <label
            htmlFor="description"
            className="profile-edit-label"
          >
            Descrição
            <textarea
              className="profile-edit-input textarea-edit"
              placeholder="Sobre mim"
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
              text="Salvar"
              clickFunction={ this.handleSubmit }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
