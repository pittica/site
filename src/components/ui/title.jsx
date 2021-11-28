import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

import "../../scss/ui/_title.scss"

export default function Title({ children, link, className }) {
  if (children) {
    return (
      <h1 className={classNames("title", className)}>
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
  className: PropTypes.string,
}
