import React from "react"
import PropTypes from "prop-types"

export default function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="field">
      <div className="control">
        <label className="label">
          {label}
          <textarea
            className="textarea"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
          >
            {value}
          </textarea>
        </label>
      </div>
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
}
