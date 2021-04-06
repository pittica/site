import React from 'react';
import classnames from 'classnames';

import SectionTitle from './section-title';

import '../../scss/ui/_section.scss';

export default function Section({ children, title, subtitle, link, className }) {
  return (
    <section className={classnames('section', className)}>
      {(title || subtitle) && <SectionTitle title={title} subtitle={subtitle} link={link} />}
      {children && <div className="container">{children}</div>}
    </section>
  );
}
