import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './style/ProfileEdit.css';
import { getUser, updateUser } from '../services/userAPI';

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
    console.log(localStorage);
    this.setState({
      ...localStorage,
    });
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  handleSubmit = () => {
    localStorage.clear();
    updateUser(this.state);
  }

  render() {
    const { image, name, email, description } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <div className="profile-edit-container">
          <div className="profile-edit-image">
            <FaUserCircle className="profile-icon" />
            <input
              className="input-image"
              type="text"
              placeholder="Insira o link da imagem"
              name="image"
              value={ image !== '' ? image : null }
              onChange={ this.handleChangeInput }
            />
          </div>
          <label htmlFor="profile-edit-name" className="profile-edit-label">
            Nome
            <input
              className="profile-edit-input"
              type="text"
              placeholder="Insira seu nome"
              name="name"
              value={ name !== '' ? name : null }
              onChange={ this.handleChangeInput }
            />
          </label>
          <labe
            htmlFor="profile-edit-email"
            className="profile-edit-label"
          >
            Email
            <input
              className="profile-edit-input"
              type="text"
              placeholder="usuario@usuario.com.br"
              name="email"
              value={ email !== '' ? email : null }
              onChange={ this.handleChangeInput }
            />
          </labe>
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
            <button
              type="button"
              className="profile-edit-button"
              onClick={ this.handleSubmit }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
