import React from 'react';
import { Link } from 'gatsby';

import '../../../scss/ui/link/_tag-link.scss';

export default function TagLink({tag}) {
    return (
      <Link to={`/tag/${tag.slug}`} className="tag-link">
        <span>
          <i className="icon-pittica-tag" /> {tag.name}
        </span>
      </Link>
    );
  }
