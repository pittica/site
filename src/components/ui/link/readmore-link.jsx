import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classnames from "classnames"

import "../../../scss/ui/link/_readmore-link.scss"

export default function ReadmoreLink({ slug, featured }) {
  return (
    <div className={classnames("readmore-link", { "is-featured": featured })}>
      <Link to={slug}>Leggi di più...</Link>
    </div>
  )
}

ReadmoreLink.propTypes = {
  slug: PropTypes.string.isRequired,
  featured: PropTypes.bool,
}

ReadmoreLink.defaultProps = {
  featured: false,
}
