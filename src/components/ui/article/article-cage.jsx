import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Link } from "gatsby"

import "../../../scss/ui/article/_article-cage.scss"

export default function ArticleCage({
  node,
  slug,
  children,
  className,
  featured,
}) {
  return (
    <article className={classNames("article-cage", className)}>
      {children}
      <section>
        <Link
          to={slug}
          dangerouslySetInnerHTML={{
            __html: node.description || node.excerpt,
          }}
        />
      </section>
      <div className={classNames("readmore-link", { "is-featured": featured })}>
        <Link to={slug}>Leggi di più...</Link>
      </div>
    </article>
  )
}

ArticleCage.propTypes = {
  node: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  featured: PropTypes.bool.isRequired,
}

ArticleCage.defaultProps = {
  featured: true,
}
