import React, { Component } from "react"
import PropTypes from "prop-types"

export const ReCaptchaLoader = () => {
  if (typeof document !== "undefined") {
    const script = document.createElement("script")

    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`
    script.id = `grecaptcha-lib`

    document.body.appendChild(script)
  }
}

export const ReCaptchaUnloader = () => {
  if (typeof document !== "undefined") {
    document.body.removeChild(document.getElementById("grecaptcha-lib"))

    if (IsReady()) {
      delete window.grecaptcha
    }
  }
}

export const IsReady = () => typeof window !== "undefined" && typeof window.grecaptcha !== "undefined" && typeof window.grecaptcha.execute !== "undefined"

let readyCheck

export default class ReCaptcha extends Component {
  constructor(props, context) {
    super(props, context)

    this.execute = this.execute.bind(this)

    this.state = {
      ready: IsReady()
    }

    if (!this.state.ready) {
      readyCheck = setInterval(this._updateReadyState.bind(this), 1000)
    } else {
      this.execute()
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.ready && !prevState.ready) {
      this.execute()
    }
  }

  componentWillUnmount() {
    clearInterval(readyCheck)
    ReCaptchaUnloader()
  }

  execute() {
    const {
      verifyCallback,
      action,
    } = this.props

    if (this.state.ready) {
      let clientId = window.grecaptcha.render(this.props.elementID, {
        sitekey: this.props.sitekey,
        badge: "inline",
        size: "invisible"
      })

      window.grecaptcha.execute(clientId, { action })
        .then(token => {
          if (typeof verifyCallback !== 'undefined') {
            verifyCallback(token)
          }
        })
    }
  }

  _updateReadyState() {
    if (IsReady()) {
      this.setState(() => ({ ready: true }))

      clearInterval(readyCheck)
    }
  }

  render() {
    return this.state.ready ? (
      <div
        id={this.props.elementID}
        data-verifycallbackname={this.props.verifyCallbackName}
      />
    ) : (
        <div id={this.props.elementID} className="g-recaptcha" />
      )
  }
}

ReCaptcha.propTypes = {
  elementID: PropTypes.string,
  verifyCallbackName: PropTypes.string,
  verifyCallback: PropTypes.func,
  sitekey: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}

ReCaptcha.defaultProps = {
  elementID: 'g-recaptcha',
  verifyCallbackName: 'verifyCallback'
}
