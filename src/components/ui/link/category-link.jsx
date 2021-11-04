import React from "react"
import { Link } from "gatsby"

export default function CategoryLink({ category: { slug, name } }) {
  return (
    <Link to={`/categories/${slug}`} className="category-link">
      <span>
        <i className="icon-pittica-folder" /> {name}
      </span>
    </Link>
  )
}
