import React from 'react';
import '../style/Input.css';

function Input({ buttonType, testId, changeFunction, classStyle, placeHolder}) {
  return (
    <input
      type={ buttonType }
      data-testid={ testId }
      className={ `text-input ${classStyle}` }
      placeholder={ placeHolder }
      onChange={ changeFunction }
    />
  );
}

export default Input;
