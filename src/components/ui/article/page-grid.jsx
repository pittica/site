import React from "react"
import { groupify } from "@pittica/gatsby-plugin-utils"

import ArticleCage from "./article-cage"
import Title from "../title"

import "../../../scss/ui/article/_page-grid.scss"

export default function PageGrid({ node, group }) {
  const slug = groupify(node.slug, group)

  return (
    <ArticleCage node={node} slug={slug} featured={false} className="page-grid">
      <Title link={slug}>{node.title || node.slug}</Title>
    </ArticleCage>
  )
}
