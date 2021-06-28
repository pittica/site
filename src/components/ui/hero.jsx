import React from "react"
import classnames from "classnames"

export default function Hero({
  title,
  subtitle,
  centered,
  children,
  className,
}) {
  return (
    <section className={classnames("hero", className)}>
      <div className="hero-body">
        <div className="container">
          {title && (
            <h1
              className={classnames("title", "is-size-1", {
                "has-text-centered": centered,
              })}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <h2
              className={classnames("subtitle", "is-size-3", {
                "has-text-centered": centered,
              })}
            >
              {subtitle}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
