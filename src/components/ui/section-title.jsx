import React from "react"
import { Link } from "gatsby"
import classnames from "classnames"

import "../../scss/ui/_section-title.scss"

export default function SectionTitle({ title, subtitle, link, centered }) {
  return (
    <div className={classnames("container", "section-title")}>
      {title && (
        <h1
          className={classnames("title", {
            "has-text-centered": centered,
          })}
        >
          {link ? <Link to={link}>{title}</Link> : title}
        </h1>
      )}
      {subtitle && (
        <h2
          className={classnames("subtitle", {
            "has-text-centered": centered,
          })}
        >
          {link ? <Link to={link}>{subtitle}</Link> : subtitle}
        </h2>
      )}
    </div>
  )
}
