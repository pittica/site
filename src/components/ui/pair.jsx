import React from "react"
import PropTypes from "prop-types"

export default function Pair({ label, value }) {
  if (value) {
    return (
      <div>
        <span className="has-text-primary">{label}</span> {value}
      </div>
    )
  } else {
    return null
  }
}

Pair.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
}
