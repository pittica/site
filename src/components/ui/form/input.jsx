import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default function Input({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <div className="field">
      <div className="control">
        <label className="label">
          {label}
          <input
            className={classNames("input", className)}
            type={type || "text"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
}
