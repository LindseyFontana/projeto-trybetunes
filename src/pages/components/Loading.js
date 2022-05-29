import React from 'react';
import { PropTypes } from 'prop-types';
import '../style/Loading.css';

function Loading({ component }) {
  return (
    <p className={ component === 'login' ? 'loading-login' : 'loading' }>
      Carregando...
    </p>

  );
}

Loading.propTypes = {
  component: PropTypes.string.isRequired,
};

export default Loading;
