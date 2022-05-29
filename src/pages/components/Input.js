import React from 'react';
import { PropTypes } from 'prop-types';
import '../style/Input.css';

function Input({ buttonType, onChange, classStyle, placeHolder, value, name, label }) {
  return (
    <label htmlFor={ classStyle } className="profile-edit-label">
      { label }
      <input
        type={ buttonType }
        name={ name }
        className={ `text-input ${classStyle}` }
        placeholder={ placeHolder }
        value={ value }
        onChange={ onChange }
      />
    </label>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  classStyle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default Input;
