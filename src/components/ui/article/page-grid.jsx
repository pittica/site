import React from "react"
import { Link } from "gatsby"

import ReadmoreLink from "../link/readmore-link"

import "../../../scss/ui/article/_page-grid.scss"

export default function PageGrid({ node, group }) {
  const title = node.title || node.slug
  const parts = []

  if (group) {
    parts.push(group)
  }

  parts.push(node.slug)

  const link = `/${parts.join("/")}`

  return (
    <article className="page-grid">
      <header className="page-grid-header">
        <h4 className="title">
          <Link to={link}>{title}</Link>
        </h4>
      </header>
      <section>
        <Link
          to={link}
          dangerouslySetInnerHTML={{
            __html: node.description || node.subtitle || node.excerpt,
          }}
        />
      </section>
      <ReadmoreLink slug={link} />
    </article>
  )
}
