import React from "react"
import PropTypes from "prop-types"

export default function Select({ options, name, label, required }) {
  return (
    <div className="field">
      <div className="control">
        <label className="label">
          {label}
          {required && <span className="has-text-danger"> *</span>}
          <div>
            <div className="select">
              <select name={name} required={required}>
                <option value="">---</option>
                {options.map((option, i) => (
                  <option key={`option-${i}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}

Select.propTypes = {
  option: PropTypes.array.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
}

Select.defaultProps = {
  option: [],
  required: false,
}
