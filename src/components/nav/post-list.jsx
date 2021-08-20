import React from "react"
import PropTypes from "prop-types"

import "../../scss/nav/_post-list.scss"

export default function PostList({ children }) {
  if (children) {
    return <ul className="post-list">{children}</ul>
  } else {
    return null
  }
}

PostList.propTypes = {
  children: PropTypes.any,
}
