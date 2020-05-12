import React from "react"

import ErrorLayout from "../components/error-layout"

import image from "../../static/assets/404.svg"

export default class UnauthorizedPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="401" image={image} title="Unauthorized" location={this.props.location} />
    )
  }
}
