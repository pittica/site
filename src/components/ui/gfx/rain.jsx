import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { RainCanvas } from "@pittica/gatsby-plugin-canvas-animations"

import "../../../scss/effects/_lighting.scss"

export default function Rain({ children }) {
  return (
    <div className={classNames("ui-effects", "rain")}>
      <RainCanvas />
      <div>{children}</div>
    </div>
  )
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
