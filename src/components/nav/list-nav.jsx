import React from 'react';
import { Paginator } from '@pittica/gatsby-plugin-blog';

import '../../scss/nav/_list-nav.scss';

export default function ListNav({ context }) {
  return <Paginator context={context} className="list-nav" />;
}
