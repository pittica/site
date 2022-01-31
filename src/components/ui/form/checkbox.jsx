import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import "../../../scss/ui/form/_checkbox.scss"

export default function CheckBox({
  children,
  name,
  value,
  required,
  onChange,
  label,
}) {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input
            type="checkbox"
            onChange={onChange}
            name={name}
            value={value}
            required={required}
          />
          {children && <div className="inner-checkbox">{children}</div>}
          {label && (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: label,
                }}
              />
              {required && (
                <div className={classNames("help", "is-danger")}>Richiesto</div>
              )}
            </div>
          )}
        </label>
      </div>
    </div>
  )
}

CheckBox.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
}

CheckBox.defaultProps = {
  value: 1,
  required: false,
}
