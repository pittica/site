import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default function Input({
  type,
  label,
  name,
  placeholder,
  required,
  hidden,
  value,
  onChange,
  className,
}) {
  if (hidden) {
    return (
      <input
        className={classNames("input", "is-hidden", className)}
        type={type || "hidden"}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
    )
  } else {
    return (
      <div className="field">
        <div className="control">
          <label className="label">
            {label}
            {required && <span className="has-text-danger"> *</span>}
            <input
              className={classNames("input", className)}
              type={type || "text"}
              name={name}
              placeholder={placeholder}
              value={value}
              required={required}
              onChange={onChange}
            />
          </label>
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  hidden: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
}

Input.defaultProps = {
  required: false,
  hidden: false,
}
