import React from 'react';
import { BsHeadphones } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import '../style/Logo.css';

function Logo({ component }) {
  return (
    <div className={ `${component}-logo-container` }>
      <p className={ `${component}-logo-up` }>
        Trybe
        <span>
          <BsHeadphones className={ `icon-${component}` } />
        </span>
      </p>
      <p className={ `${component}-logo-down` }>tunes</p>
    </div>
  );
}

Logo.propTypes = {
  component: PropTypes.string.isRequired,
};

export default Logo;
