import React, { Component } from "react"
import { Link } from "gatsby"
import { pathify } from "../../../utils/pathify"
import slugify from "slug"

export default class CategoryLink extends Component {
  render() {
    const path = pathify('category', slugify(this.props.category, { lower: true }));
    
    return (
      <Link to={path} className="category-link">
        <span><i className="icon-pittica-folder"></i> {this.props.category}</span>
      </Link>
    )
  }
}
