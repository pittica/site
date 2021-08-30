import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import "../../../scss/ui/form/_button.scss"

export default function Button({ loading, label, onClick }) {
  const handleClick = (e) => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    onClick()
  }

  const classes = classNames("button", "is-primary", {
    "is-loading": loading,
  })

  return (
    <div className={classNames("field", "is-grouped", "is-grouped-right")}>
      <div className="control">
        <button onClick={handleClick} className={classes}>
          {label}
        </button>
      </div>
    </div>
  )
}

Button.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  loading: false,
}
