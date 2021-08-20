import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "../../scss/ui/_subtitle.scss"

export default function Subtitle({ children, link }) {
  if (children) {
    return (
      <h2 className="subtitle">
        {link ? <Link to={link}>{children}</Link> : children}
      </h2>
    )
  } else {
    return null
  }
}

Subtitle.propTypes = {
  children: PropTypes.string,
  link: PropTypes.string,
}
