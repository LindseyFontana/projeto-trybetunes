import React from 'react';
import { BsHeadphones } from 'react-icons/bs';
import '../style/Logo.css';

function Logo({ component }) {
  return (
    <div className={ `${component}-logo-container` }>
      <p className={ `${component}-logo-up` }>
        Trybe
        <span>
          <BsHeadphones className="icon-header" />
        </span>
      </p>
      <p className={ `${component}-logo-down` }>tunes</p>
    </div>
  );
}

export default Logo;
