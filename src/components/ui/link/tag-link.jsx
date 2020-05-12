import React, { Component } from "react"
import { Link } from "gatsby"
import { pathify } from "gatsby-plugin-tags/internals"
import slugify from "slug"

import "../../../scss/ui/link/_tag-link.scss"

export default class TagLink extends Component {
  render() {
    const path = pathify('tags', slugify(this.props.tag, { lower: true }));

    return (
      <Link to={path} className="tag-link">
        <span><i className="icon-pittica-tag"></i> {this.props.tag}</span>
      </Link>
    )
  }
}