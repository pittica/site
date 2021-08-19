import React from "react"
import { Link } from "gatsby"

import "../../scss/ui/_header.scss"

export default function Header({ children, title, subtitle, link }) {
  if (title || subtitle || children) {
    return (
      <header className="header">
        <div className="container">
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
          {children}
        </div>
      </header>
    )
  } else {
    return null
  }
}
