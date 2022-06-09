import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

export default function InnerLink({ link, title, target, children }) {
  if (link && (link.url || (link.page && link.page.slug))) {
    const { url, page } = link

    if (url) {
      return (
        <a href={url} target={target || "_system"} title={link.title || title}>
          {children}
        </a>
      )
    } else {
      return (
        <Link to={`/${page.slug}`} target={target} title={link.title || title}>
          {children}
        </Link>
      )
    }
  } else {
    return children
  }
}

InnerLink.propTypes = {
  link: PropTypes.object,
  title: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.any,
}
