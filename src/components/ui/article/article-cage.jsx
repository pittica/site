import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import ReadmoreLink from "../link/readmore-link"

export default function ArticleCage({
  node,
  slug,
  children,
  className,
  featured,
}) {
  return (
    <article className={className}>
      {children}
      <section>
        <Link
          to={slug}
          dangerouslySetInnerHTML={{
            __html: node.description || node.excerpt,
          }}
        />
      </section>
      <ReadmoreLink slug={slug} featured={featured} />
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
