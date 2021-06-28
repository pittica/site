import React, { Component } from "react"
import classnames from "classnames"

import "../../../scss/ui/form/_button.scss"

export default class Button extends Component {
  handleClick = (e) => {
    e.nativeEvent.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    this.props.onClick()
  }

  render() {
    const classes = classnames("button", "is-primary", {
      "is-loading": this.props.loading,
    })

    return (
      <div className={classnames(["field", "is-grouped", "is-grouped-right"])}>
        <div className="control">
          <button onClick={this.handleClick} className={classes}>
            {this.props.label}
          </button>
        </div>
      </div>
    )
  }
}
