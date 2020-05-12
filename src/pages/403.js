import React from "react"

import ErrorLayout from "../components/error-layout"

import image from "../../static/assets/404.svg"

export default class ForbiddenPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="403" image={image} title="Forbidden" location={this.props.location} />
    )
  }
}
