import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link } from "gatsby"
import ImagePost from "../image/image-post"
import { groupify } from "@pittica/gatsby-plugin-utils"

import ArticleCage from "./article-cage"

export default function StaticGrid({ node, group }) {
  const title = node.title || node.slug
  const slug = groupify(node.slug, group)

  return (
    <ArticleCage node={node} slug={slug} className="static-grid">
      <ImagePost image={node.image} title={title} link={slug} />
      <section>
        <h3 className={classNames("title", "pt-4")}>
          <Link to={slug}>{title}</Link>
        </h3>
      </section>
    </ArticleCage>
  )
}

StaticGrid.propTypes = {
  node: PropTypes.object,
}
