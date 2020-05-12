import React from "react"

import ErrorLayout from "../components/error-layout"

import image from "../../static/assets/404.svg"

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="404" image={image} title="Not Found" location={this.props.location} />
    )
  }
}
