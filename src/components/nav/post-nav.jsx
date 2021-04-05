import React from 'react';
import { Link } from 'gatsby';

import BottomNav from './bottom-nav';

import '../../scss/nav/_post-nav.scss';

export default function PostNav({ previous, next }) {
  if (previous || next) {
    return (
      <BottomNav>
        <ul className="post-nav">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <i className="icon-pittica-arrow-left" /> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} <i className="icon-pittica-arrow-right" />
              </Link>
            )}
          </li>
        </ul>
      </BottomNav>
    );
  } else {
    return null;
  }
}
