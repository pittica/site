import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import '../../scss/sections/_partners.scss';

const Partners = () => {
  return (
    <div className={classnames('partners', 'columns', 'is-vcentered')}>
      <div className={classnames('column', 'is-6', 'has-text-centered')}>
        <a href="https://www.assintel.it/soci/pittica_srls/">
          <img src="/assets/partners/assintel.png" alt="Assintel" className="partner-logo" />
        </a>
      </div>
      <div className={classnames('column', 'is-6', 'has-text-centered')}>
        <Link to="/iubenda" title="iubenda Certified Bronze Partner">
          <img
            src="https://www.iubenda.com/partner/bronze@2x.png"
            alt="iubenda Certified Bronze Partner"
            width="306"
            height="108"
          />
        </Link>
      </div>
    </div>
  );
};

export default Partners;
