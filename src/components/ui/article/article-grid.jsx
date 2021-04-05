import React, { Component } from 'react';
import { Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import ArticleHeader from './article-header';
import ReadmoreLink from '../link/readmore-link';

import '../../../scss/ui/article/_article-grid.scss';

export default class ArticleGrid extends Component {
  render() {
    const node = this.props.node;
    const title = node.frontmatter.title || node.fields.slug;
    const image = getImage(node.frontmatter.image);

    return (
      <article className="article-grid">
        <ArticleHeader image={image ? image.images.fallback.src : null} className="article-grid-header">
          <h3 className="title">
            <Link to={node.fields.slug}>
              <span>
                <strong>{title}</strong>
              </span>
            </Link>
          </h3>
          {node.frontmatter.date && (
            <Link to={node.fields.slug} className="date">
              <small>
                <i className="icon-pittica-clock" /> {node.frontmatter.date}
              </small>
            </Link>
          )}
        </ArticleHeader>
        <section>
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
