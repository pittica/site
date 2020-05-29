import React, { Component } from "react"
import PropTypes from "prop-types"
import { RainCanvas } from "@pittica/gatsby-plugin-canvas-animations"

import "../../../scss/effects/_lighting.scss"

export default class Rain extends Component {
  render() {
    return (
      <div className="ui-effects rain">
        <RainCanvas />
        <div ref="children">{this.props.children}</div>
      </div>
    )
  }
}

Rain.propTypes = {
  children: PropTypes.node,
  lineWidth: PropTypes.number,
  maxParts: PropTypes.number,
}

Rain.defaultProps = {
  children: null,
  lineWidth: 2,
  maxParts: 1000,
}
