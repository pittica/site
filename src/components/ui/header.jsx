import React from "react"

import Title from "./title"
import Subtitle from "./subtitle"

import "../../scss/ui/_header.scss"

export default function Header({ children, title, subtitle, link }) {
  if (title || subtitle || children) {
    return (
      <header className="header">
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
