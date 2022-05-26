import React, { useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './style/ProfileEdit.css';
import { getUser, updateUser } from '../services/userAPI';
import Context from '../contextAPI/Context';
import Button from './components/Button';
import Input from './components/Input';

function ProfileEdit({ history }) {
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    async function saveInLocalStorage() {
      const localStorage = await getUser();
      setUser({
        ...localStorage,
      });
    }
    saveInLocalStorage();
  }, []);

  const handleChangeInput = ({ target }) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = () => {
    updateUser(user);
    history.push('/profile');
  };

  return (
    <div data-testid="page-profile-edit">
      <div className="profile-edit-container">
        <div className="profile-edit-image">
          <FaUserCircle className="profile-icon" />
          <Input
            classStyle="input-image"
            name="image"
            placeHolder="Insira o link da imagem"
            value={ user.image !== '' ? user.image : null }
            onChange={ handleChangeInput }
          />
        </div>
        <Input
          buttonType="text"
          classStyle="profile-edit-input"
          placeHolder="Insira seu nome"
          label="Nome"
          name="name"
          value={ user.name !== '' ? user.name : null }
          onChange={ handleChangeInput }
        />
        <Input
          buttonType="text"
          classStyle="profile-edit-input"
          placeHolder="usuario@usuario.com.br"
          label="E-mail"
          name="email"
          value={ user.email !== '' ? user.email : null }
          onChange={ handleChangeInput }
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
            value={ user.description !== '' ? user.description : null }
            onChange={ handleChangeInput }
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
            clickFunction={ handleSubmit }
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
