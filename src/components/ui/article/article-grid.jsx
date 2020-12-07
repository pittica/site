import React, { Component } from "react"
import { Link } from "gatsby"
import ArticleHeader from "./article-header"

import "../../../scss/ui/article/_article-grid.scss"

export default class ArticleGrid extends Component {
  render() {
    const node = this.props.node
    const title = node.frontmatter.title || node.fields.slug

    return (
      <article className="article-grid">
        <ArticleHeader
          image={
            node.frontmatter.image
              ? node.frontmatter.image.childImageSharp.sizes.src
              : null
          }
          className="article-grid-header"
        >
          <h3 className="title">
            <Link to={`${node.fields.slug}`}>
              <span>
                <strong>{title}</strong>
              </span>
            </Link>
          </h3>
          <Link to={`${node.fields.slug}`} className="date">
            <small>
              <i className="icon-pittica-clock"></i> {node.frontmatter.date}
            </small>
          </Link>
        </ArticleHeader>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />
        </section>
        <div className="readmore">
          <Link to={`${node.fields.slug}`}>Leggi di più...</Link>
        </div>
      </article>
    )
  }
}
