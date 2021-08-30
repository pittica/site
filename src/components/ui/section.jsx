import React from "react"
import classNames from "classnames"

import Title from "./title"
import Subtitle from "./subtitle"

import "../../scss/ui/_section.scss"

export default function Section({
  children,
  title,
  subtitle,
  link,
  className,
}) {
  return (
    <section className={classNames("section", className)}>
      {(title || subtitle) && (
        <div className={classNames("container")}>
          <Title link={link}>{title}</Title>
          <Subtitle link={link}>{subtitle}</Subtitle>
        </div>
      )}
      {children && <div className="container">{children}</div>}
    </section>
  )
}
