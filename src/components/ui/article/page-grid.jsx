import React from "react"
import { Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import ArticleCage from "./article-cage"
import Title from "../title"

import "../../../scss/ui/article/_page-grid.scss"

export default function PageGrid({ node, group }) {
  const title = node.title || node.slug
  const slug = groupify(node.slug, group)

  return (
    <ArticleCage node={node} slug={slug} featured={false} className="page-grid">
      <Title link={slug}>{title}</Title>
      <section>
        <Link
          to={slug}
          dangerouslySetInnerHTML={{
            __html: node.description || node.subtitle || node.excerpt,
          }}
        />
      </section>
    </ArticleCage>
  )
}
