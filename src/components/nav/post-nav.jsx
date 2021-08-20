import React from "react"

import ListItem from "./list-item"
import PostList from "./post-list"

import "../../scss/nav/_post-nav.scss"

export default function PostNav({ previous, next }) {
  if (previous || next) {
    return (
      <nav className="post-nav">
        <PostList>
          {previous && (
            <ListItem
              group="blog"
              slug={previous.slug}
              rel="prev"
              single={true}
            >
              <i className="icon-pittica-arrow-left" /> {previous.title}
            </ListItem>
          )}
          {next && (
            <ListItem group="blog" slug={next.slug} rel="prev" single={true}>
              {previous.title} <i className="icon-pittica-arrow-right" />
            </ListItem>
          )}
        </PostList>
      </nav>
    )
  } else {
    return null
  }
}
