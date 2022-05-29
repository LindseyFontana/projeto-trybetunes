import React from 'react';
import { PropTypes } from 'prop-types';
import '../style/Button.css';

function Button({ buttonType, isDesabled, clickFunction, name, text }) {
  const style = (buttonType === 'submit' ? 'submit-button' : 'edit-button');

  return (
    <button
      type={ buttonType }
      className={ `button ${style} ${name}` }
      disabled={ isDesabled }
      onClick={ clickFunction }
    >
      {text}
    </button>

  );
}

Button.propTypes = {
  isDesabled: PropTypes.bool.isRequired,
  clickFunction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
