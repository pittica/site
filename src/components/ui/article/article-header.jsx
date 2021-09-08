import React from "react"
import PropTypes from "prop-types"

export default function ArticleHeader({ children, image, className }) {
  if (image) {
    return (
      <header
        style={{ backgroundImage: `url(${image})` }}
        className={className}
      >
        {children}
      </header>
    )
  } else {
    return <header className={className}>{children}</header>
  }
}

ArticleHeader.propTypes = {
  children: PropTypes.any,
  image: PropTypes.string,
  className: PropTypes.string,
}
