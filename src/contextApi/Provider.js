import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({});

  handleSubmitButton = () => {

  };

  const contextValue = {
    data,
    handleSubmitButton,
  };

  return (
    <Context.Provider
      value={ { contextValue } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
