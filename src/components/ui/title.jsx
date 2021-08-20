import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "../../scss/ui/_title.scss"

export default function Title({ children, link }) {
  if (children) {
    return (
      <h1 className="title">
        {link ? <Link to={link}>{children}</Link> : children}
      </h1>
    )
  } else {
    return null
  }
}

Title.propTypes = {
  children: PropTypes.string,
  link: PropTypes.string,
}
