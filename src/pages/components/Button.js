import React from 'react';
import '../style/Button.css';

function Button({ buttonType, testId, isDesabled, clickFunction, name, text }) {
  return (
    <button
      type={ buttonType }
      data-testid={ testId }
      className={ `submit-button ${name}` }
      disabled={ isDesabled }
      onClick={ clickFunction }
    >
      {text}
    </button>
  );
}

export default Button;
