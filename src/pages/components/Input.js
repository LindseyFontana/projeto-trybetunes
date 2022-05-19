import React from 'react';
import '../style/Input.css';

function Input({ buttonType, testId, changeFunction, classStyle, placeHolder, value, nome}) {
  return (
    <label htmlFor={ classStyle } className="profile-edit-label">
      { nome }
      <input
        type={ buttonType }
        data-testid={ testId }
        className={ `text-input ${classStyle}` }
        placeholder={ placeHolder }
        value={ value }
        onChange={ changeFunction }
      />
    </label>
  );
}

export default Input;
