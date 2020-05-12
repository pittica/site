import React from "react"

import ErrorLayout from "../components/error-layout"

import image from "../../static/assets/404.svg"

export default class InternalErrorPage extends React.Component {
  render() {
    return (
      <ErrorLayout code="500" image={image} title="Internal Error" location={this.props.location} />
    )
  }
}
