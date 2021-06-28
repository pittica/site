import React from "react"
import { Link } from "gatsby"

import BottomNav from "./bottom-nav"

import "../../scss/nav/_post-nav.scss"

export default function PostNav({ previous, next }) {
  if (previous || next) {
    return (
      <BottomNav>
        <ul className="post-nav">
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
      </BottomNav>
    )
  } else {
    return null
  }
}
