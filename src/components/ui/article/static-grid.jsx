import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import ReadmoreLink from '../link/readmore-link';

export default function StaticGrid({ node, group }) {
  const title = node.title || node.slug;
  const image = getImage(node.image.localFile.childImageSharp);
  const parts = [];

  if (group) {
    parts.push(group);
  }

  parts.push(node.slug);

  const link = `/${parts.join('/')}`;

  return (
    <article className="static-grid">
      {image && (
        <Link to={link}>
          <GatsbyImage image={image} alt={title} />
        </Link>
      )}
      <section>
        <h3 className="title">
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
