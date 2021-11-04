import React from "react"
import { Link } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import ArticleCage from "./article-cage"
import ArticleHeader from "./article-header"

import "../../../scss/ui/article/_article-grid.scss"

export default function ArticleGrid({ node }) {
  const image =
    node.image && node.image.localFile
      ? getImage(node.image.localFile.childImageSharp)
      : null
  const slug = `/blog/${node.slug}`

  return (
    <ArticleCage node={node} slug={slug} className="article-grid">
      <ArticleHeader
        image={image ? image.images.fallback.src : null}
        className="article-grid-header"
      >
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
    </ArticleCage>
  )
}
