import React from "react"
import { Link } from "gatsby"

import "../../scss/nav/_post-nav.scss"

export default function PostNav({ previous, next }) {
  if (previous || next) {
    return (
      <nav className="post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={`/blog/${previous.slug}`} rel="prev">
                <i className="icon-pittica-arrow-left" /> {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog/${next.slug}`} rel="next">
                {next.title} <i className="icon-pittica-arrow-right" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    )
  } else {
    return null
  }
}
