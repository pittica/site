import React from "react"
import { Link } from "gatsby"

import "../../../scss/ui/link/_tag-link.scss"

export default function TagLink({ tag: { slug, name } }) {
  return (
    <Link to={`/tags/${slug}`} className="tag-link">
      <span>
        <i className="icon-pittica-tag" /> {name}
      </span>
    </Link>
  )
}
