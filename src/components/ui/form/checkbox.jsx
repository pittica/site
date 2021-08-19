import React from "react"
import PropTypes from "prop-types"

import "../../../scss/ui/form/_checkbox.scss"

export default function CheckBox({ children, name, value, onChange }) {
  return (
    <label className="checkbox">
      <input type="checkbox" onChange={onChange} name={name} value={value} />
      <div className="inner-checkbox">{children}</div>
    </label>
  )
}

CheckBox.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
}

CheckBox.defaultProps = {
  value: 1,
}
