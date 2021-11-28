import React from "react"
import classNames from "classnames"

import Title from "./title"
import Subtitle from "./subtitle"

export default function Hero({
  title,
  subtitle,
  centered,
  children,
  className,
}) {
  return (
    <section className={classNames("hero", className)}>
      <div className="hero-body">
        <div className="container">
          <Title
            className={classNames("is-size-1", {
              "has-text-centered": centered,
            })}
          >
            {title}
          </Title>
          <Subtitle
            className={classNames("is-size-3", {
              "has-text-centered": centered,
            })}
          >
            {subtitle}
          </Subtitle>
          {children}
        </div>
      </div>
    </section>
  )
}
