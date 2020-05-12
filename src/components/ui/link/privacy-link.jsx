import React, { Component } from "react"

export default class PrivacyLink extends Component {
  render() {
    return (
      <a href="https://www.iubenda.com/privacy-policy/29008249" title="Politica sulla Privacy" target="_system">{this.props.children || "Politica sulla Privacy"}</a>
    )
  }
}
