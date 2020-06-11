import React, { Component } from "react"

export default class Input extends Component {
  render() {
    return (
      <div className="field">
        <div className="control">
          <label className="label">
            {this.props.label}
            <input className="input" type={this.props.type} name={this.props.name || "text"} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />
          </label>
        </div>
      </div>
    )
  }
}
