import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

export default function PostList({ nodes, group }) {
  if (nodes.length > 0) {
    return (
      <ul>
        {nodes.map(({ id, slug, title }) => (
          <li key={id}>
            <Link to={groupify(slug, group)}>{title}</Link>
          </li>
        ))}
      </ul>
    )
  } else {
    return null
  }
}

PostList.propTypes = {
  nodes: PropTypes.array.isRequired,
  group: PropTypes.string,
}

PostList.defaultProps = {
  nodes: [],
}
