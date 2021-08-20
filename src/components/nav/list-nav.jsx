import React from "react"

import Ellipsis from "./ellipsis"
import ListItem from "./list-item"
import PostList from "./post-list"

function Paginate({ context }) {
  const items = []

  if (context.pages > 1) {
    items.push(
      <ListItem
        group={context.group}
        slug={context.slug}
        current={context.current}
        page={1}
        key="li-0"
      />
    )

    if (context.current > 3) {
      items.push(<Ellipsis key="ellip-0" />)
    }
  }

  for (let i = 0; i < context.pages; i++) {
    let page = i + 1

    if (
      page !== 1 &&
      page !== context.pages &&
      page < context.current + 2 &&
      page > context.current - 2
    ) {
      items.push(
        <ListItem
          group={context.group}
          slug={context.slug}
          current={context.current}
          page={page}
          key={`li-${i}`}
        />
      )
    }
  }

  if (context.pages > 1) {
    if (context.current < context.pages - 2) {
      items.push(<Ellipsis key="ellip-1" />)
    }

    items.push(
      <ListItem
        group={context.group}
        slug={context.slug}
        current={context.current}
        page={context.pages}
        key={`li-${context.pages}`}
      />
    )
  }

  return items
}

export default function ListNav({ context }) {
  if (context.pages > 1) {
    return (
      <nav className="list-nav">
        <PostList>
          <Paginate context={context} />
        </PostList>
      </nav>
    )
  } else {
    return null
  }
}
