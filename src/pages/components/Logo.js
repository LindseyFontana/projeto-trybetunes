import React from 'react';
import { Link } from 'react-router-dom';

import { BsHeadphones } from 'react-icons/bs';
import '../style/Logo.css';

function Logo({ component }) {
  return (
    <div className={ `${component}-logo-container` }>
      <Link className={ `${component}-link` } to="/">
        <p className={ `${component}-logo-up` }>
          Trybe
          <span>
            <BsHeadphones className={ `icon-${component}` } />
          </span>
        </p>
        <p className={ `${component}-logo-down` }>tunes</p>
      </Link>
    </div>

  );
}

export default Logo;
