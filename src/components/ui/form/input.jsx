import React from "react"
import classnames from "classnames"

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
            className={classnames("input", className)}
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
