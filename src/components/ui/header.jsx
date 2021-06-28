import React from "react"
import SectionTitle from "./section-title"

import "../../scss/ui/_header.scss"

export default function Header({ children, title, subtitle, link }) {
  return (
    <header className="header">
      <SectionTitle title={title} subtitle={subtitle} link={link} />
      {children && <div className="container">{children}</div>}
    </header>
  )
}
