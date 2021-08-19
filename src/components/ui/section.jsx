import React from "react"
import { Link } from "gatsby"
import classnames from "classnames"

import "../../scss/ui/_section.scss"

export default function Section({
  children,
  title,
  subtitle,
  link,
  className,
}) {
  return (
    <section className={classnames("section", className)}>
      {(title || subtitle) && (
        <div className={classnames("container", "section-title")}>
          {title && (
            <h1 className="title">
              {link ? <Link to={link}>{title}</Link> : title}
            </h1>
          )}
          {subtitle && (
            <h2 className="subtitle">
              {link ? <Link to={link}>{subtitle}</Link> : subtitle}
            </h2>
          )}
        </div>
      )}
      {children && <div className="container">{children}</div>}
    </section>
  )
}
