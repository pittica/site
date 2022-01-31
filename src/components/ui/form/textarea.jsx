import React from "react"
import PropTypes from "prop-types"

export default function Textarea({
  label,
  name,
  placeholder,
  required,
  value,
  defaultValue,
  onChange,
}) {
  return (
    <div className="field">
      <div className="control">
        <label className="label">
          {label}
          {required && <span className="has-text-danger"> *</span>}
          <textarea
            className="textarea"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            defaultValue={defaultValue}
          />
        </label>
      </div>
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
}

Textarea.defaultProps = {
  required: false,
}
