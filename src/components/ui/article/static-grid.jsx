import React, { Component } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import ReadmoreLink from '../link/readmore-link';

export default class StaticGrid extends Component {
  render() {
    const node = this.props.node;
    const title = node.frontmatter.title || node.fields.slug;
    const image = getImage(node.frontmatter.image);

    return (
      <article className="static-grid">
        {image && (
          <Link to={node.fields.slug}>
            <GatsbyImage image={image} alt={title} />
          </Link>
        )}
        <section>
          <h3 className="title">
            <Link to={node.fields.slug}>{title}</Link>
          </h3>
          <Link
            to={node.fields.slug}
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt
            }}
          />
        </section>
        <ReadmoreLink slug={node.fields.slug} featured={true} />
      </article>
    );
  }
}
