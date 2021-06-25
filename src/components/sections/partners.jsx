import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

const Partners = () => {
  return (
    <div className={classnames('partners', 'columns', 'is-vcentered')}>
      <div className={classnames('column', 'is-4', 'has-text-centered')}>
        <a href="https://cloud.withgoogle.com/partners/detail/?id=pittica" className="p-6" target="_new">
          <img src="/assets/partners/google-cloud.png" alt="Google Cloud" width="947" height="288" />
        </a>
      </div>
      <div className={classnames('column', 'is-4', 'has-text-centered')}>
        <a href="https://www.assintel.it/soci/pittica_srls/" className="p-6" target="_new">
          <img src="/assets/partners/assintel.png" alt="Assintel" width="1925" height="358" />
        </a>
      </div>
      <div className={classnames('column', 'is-4', 'has-text-centered')}>
        <Link to="/iubenda" title="iubenda Certified Bronze Partner" className="p-6" target="_new">
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
