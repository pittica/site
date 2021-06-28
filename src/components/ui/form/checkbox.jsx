import React from "react"

import "../../../scss/ui/form/_checkbox.scss"

export default function CheckBox({ children, name, value, onChange }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        onChange={onChange}
        name={name}
        value={value || 1}
      />
      <div className="inner-checkbox">{children}</div>
    </label>
  )
}
