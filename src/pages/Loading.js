import React from 'react';
import './style/Loading.css';

function Loading({ component }) {
  return (
    <p className={ component === 'login' ? 'loading-login' : 'loading' }>
      Loading...
    </p>

  );
}

export default Loading;
