import React from "react"
import classNames from "classnames"
import { Post } from "@pittica/gatsby-plugin-navigation"

import "../../scss/nav/_post-nav.scss"

export default function PostNav({ previous, next }) {
  return (
    <Post
      previous={previous}
      next={next}
      group="blog"
      className={classNames("is-centered", "post-nav")}
      iconNext="icon-pittica-arrow-right"
      iconPrevious="icon-pittica-arrow-left"
    />
  )
}
