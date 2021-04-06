
import React, { Component } from 'react';
import { Link } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import ArticleHeader from './article-header';
import ReadmoreLink from '../link/readmore-link';

import '../../../scss/ui/article/_article-grid.scss';

export default class ArticleGrid extends Component {
  render() {
    const node = this.props.node;
    const image = node.image ? getImage(node.image.localFile.childImageSharp) : null;
    const slug = `/blog/${node.slug}`;

    return (
      <article className="article-grid">
        <ArticleHeader image={image ? image.images.fallback.src : null} className="article-grid-header">
          <h3 className="title">
            <Link to={slug}>
              <span>
                <strong>{node.title || slug}</strong>
              </span>
            </Link>
          </h3>
          {node.date && (
            <Link to={slug} className="date">
              <small>
                <i className="icon-pittica-clock" /> {node.date}
              </small>
            </Link>
          )}
        </ArticleHeader>
        <section>
          <Link
            to={slug}
            dangerouslySetInnerHTML={{
              __html: node.description || node.excerpt
            }}
          />
        </section>
        <ReadmoreLink slug={slug} featured={true} />
      </article>
    );
  }
}
