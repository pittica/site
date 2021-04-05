import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import '../../scss/nav/_navbar-item.scss';

export default function NavbarItem({ to, children, location }) {
  return (
    <Link
      to={to}
      className={classnames('navbar-item', {
        'is-active': location.pathname === to
      })}
    >
      {children}
    </Link>
  );
}
