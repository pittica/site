import React from "react"
import { Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import getCoverFallback from "../../../utils/get-cover-fallback"

import "../../../scss/ui/article/_article-grid.scss"

export default function ArticleGrid({ node }) {
  const slug = groupify(node.slug, "blog")
  const image = getCoverFallback(node)

  return (
    <article
      node={node}
      slug={slug}
      className="article-grid"
      style={image ? { backgroundImage: `url(${image})` } : null}
    >
      <header className="article-grid-header">
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
      </header>
      <section>
        <Link
          to={slug}
          dangerouslySetInnerHTML={{
            __html: node.description || node.excerpt,
          }}
        />
      </section>
      <div className="readmore-link">
        <Link to={slug}>Leggi di più...</Link>
      </div>
    </article>
  )
}
