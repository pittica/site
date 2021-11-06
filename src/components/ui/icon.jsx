import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default function Icon({ children, glyph, className }) {
  if (children) {
    return (
      <span className="icon-text">
        <span className={classNames("icon", className)}>
          <i className={glyph}></i>
        </span>
        <span>{children}</span>
      </span>
    )
  } else {
    return (
      <span className={classNames("icon", className)}>
        <i className={glyph}></i>
      </span>
    )
  }
}

Icon.propTypes = {
  children: PropTypes.any,
  glyph: PropTypes.string.isRequired,
  className: PropTypes.string,
}
