import React from 'react';
import '../style/Button.css';

function Button({ buttonType, testId, isDesabled, clickFunction, name, text}) {
  const style = (buttonType === 'submit' ? 'submit-button' : 'edit-button');

  return (
    <button
      type={ buttonType }
      data-testid={ testId }
      className={ `button ${style} ${name}` }
      disabled={ isDesabled }
      onClick={ clickFunction }
    >
      {text}
    </button>

  );
}

export default Button;
