import React from "react"
import PropTypes from "prop-types"

export default function Icon({ children, className }) {
  if (children) {
    return (
      <span className="icon-text">
        <span className="icon">
          <i className={className}></i>
        </span>
        <span>{children}</span>
      </span>
    )
  } else {
    return (
      <span className="icon">
        <i className={className}></i>
      </span>
    )
  }
}

Icon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string.isRequired,
}
