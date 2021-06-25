import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import ImagePost from '../image/image-post';

import ReadmoreLink from '../link/readmore-link';
import { groupify } from '../../../utils/link';

export default function StaticGrid({ node, group }) {
  const title = node.title || node.slug;
  const link = groupify(node.slug, group);

  return (
    <article className="static-grid">
      <ImagePost image={node.image} title={title} link={link} />
      <section>
        <h3 className={classnames('title', 'pt-4')}>
          <Link to={link}>{title}</Link>
        </h3>
        <Link
          to={link}
          dangerouslySetInnerHTML={{
            __html: node.description || node.subtitle || node.excerpt
          }}
        />
      </section>
      <ReadmoreLink slug={link} featured={true} />
    </article>
  );
}
