import React from "react"
import { Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import ArticleCage from "./article-cage"
import ArticleHeader from "./article-header"

import getCoverFallback from "../../../utils/get-cover-fallback"

import "../../../scss/ui/article/_article-grid.scss"

export default function ArticleGrid({ node }) {
  const slug = groupify(node.slug, "blog")

  return (
    <ArticleCage node={node} slug={slug} className="article-grid">
      <ArticleHeader
        image={getCoverFallback(node)}
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
