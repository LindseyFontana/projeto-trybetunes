import React from 'react';
import './style/Loading.css';

function Loading({ component }) {
  return (
    <p className={ component === 'login' ? 'loading-login' : 'loading' }>
      Carregando...
    </p>

  );
}

export default Loading;
