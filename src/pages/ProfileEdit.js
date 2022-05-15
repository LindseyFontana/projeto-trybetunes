import React, { useState, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './style/ProfileEdit.css';

class ProfileEdit extends React.Component {
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

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      userInfos: {
        ...prevState.userInfos,
        [name]: value,
      },
    }));
  }

  handleSubmit = () => {
    const { contextValue: { handleSubmitButton } } = useContext(Context);
  }

  render() {
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
