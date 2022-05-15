import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

export default function Subtitle({ children, link, className }) {
  if (children) {
    return (
      <h2 className={classNames("subtitle", className)}>
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
  className: PropTypes.string,
}
