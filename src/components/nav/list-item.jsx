import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classnames from "classnames"

import "../../scss/nav/_list-item.scss"

export default function ListItem({
  group,
  slug,
  page,
  current,
  rel,
  children,
  single,
}) {
  let link = ""

  if (group) {
    link += "/" + group
  }

  if (slug) {
    link += "/" + slug
  }

  if (page > 1) {
    link += "/" + page
  }

  return (
    <li className={classnames("list-item", { single })}>
      <Link
        to={link}
        className={classnames({
          current: current === page,
        })}
        rel={rel}
      >
        {children || page}
      </Link>
    </li>
  )
}

ListItem.propTypes = {
  group: PropTypes.string,
  slug: PropTypes.string,
  page: PropTypes.number,
  current: PropTypes.number,
  rel: PropTypes.string,
  children: PropTypes.any,
  single: PropTypes.bool.isRequired,
}

ListItem.defaultProps = {
  single: false,
}
