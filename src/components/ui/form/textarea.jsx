import React, { Component } from "react"

export default class Textarea extends Component {
  render() {
    return (
      <div className="field">
        <div className="control">
          <label className="label">
            {this.props.label}
            <textarea className="textarea" name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.onChange}>{this.props.value}</textarea>
          </label>
        </div>
      </div>
    )
  }
}
