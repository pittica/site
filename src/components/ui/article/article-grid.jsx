import React from "react"
import { Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import { getCoverFallback } from "../../../utils/image"

import "../../../scss/ui/article/_article-grid.scss"

export default function ArticleGrid({ node }) {
  const slug = groupify(node.slug, "blog")
  const image = getCoverFallback(node)

  return (
    <article
      slug={slug}
      className="article-grid"
      style={image ? { backgroundImage: `url(${image})` } : null}
    >
      <Link to={slug}>
        <header className="article-grid-header">
          <h3 className="title">
            <span>
              <strong>{node.title || slug}</strong>
            </span>
          </h3>
          {node.date && (
            <span to={slug} className="date">
              <small>
                <i className="icon-pittica-clock" /> {node.date}
              </small>
            </span>
          )}
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: node.description || node.excerpt,
          }}
        />
        <div className="readmore-link">
          <span>Leggi di più...</span>
        </div>
      </Link>
    </article>
  )
}
