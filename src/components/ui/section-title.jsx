import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

export default function SectionTitle({ title, subtitle, link, centered }) {
  return (
    <div className="container">
      {title && (
        <h1
          className={classnames('title', {
            'has-text-centered': centered
          })}
        >
          {link ? <Link to={link}>{title}</Link> : title}
        </h1>
      )}
      {subtitle && (
        <h2
          className={classnames('subtitle', {
            'has-text-centered': centered
          })}
        >
          {link ? <Link to={link}>{subtitle}</Link> : subtitle}
        </h2>
      )}
    </div>
  );
}
