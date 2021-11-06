import React from "react"
import classNames from "classnames"

import Title from "./title"
import Subtitle from "./subtitle"

import "../../scss/ui/_header.scss"

export default function Header({ children, title, subtitle, link, sticky }) {
  if (title || subtitle || children) {
    return (
      <header className={classNames("header", { "is-sticky": sticky })}>
        <div className="container">
          <Title link={link}>{title}</Title>
          <Subtitle link={link}>{subtitle}</Subtitle>
          {children}
        </div>
      </header>
    )
  } else {
    return null
  }
}
