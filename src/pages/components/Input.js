import React from 'react';
import '../style/Input.css';

function Input({ buttonType, testId, onChange, classStyle, placeHolder, value, name, label}) {
  return (
    <label htmlFor={ classStyle } className="profile-edit-label">
      { label }
      <input
        type={ buttonType }
        data-testid={ testId }
        name={ name }
        className={ `text-input ${classStyle}` }
        placeholder={ placeHolder }
        value={ value }
        onChange={ onChange }
      />
    </label>
  );
}

export default Input;
