import React from "react"
import classNames from "classnames"
import { Pagination } from "@pittica/gatsby-plugin-navigation"

import "../../scss/nav/_list-nav.scss"

export default function ListNav({ context }) {
  return (
    <Pagination
      context={context}
      className={classNames("list-nav", "is-centered")}
    />
  )
}
