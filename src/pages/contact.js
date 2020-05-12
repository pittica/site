import React from "react"
import { graphql } from "gatsby"
import ReCaptcha, { ReCaptchaLoader } from "../utils/recaptcha"
import axios from "axios"
import classNames from "classnames"
import Layout from "../components/layout"
import Airplane from "../components/ui/gfx/airplane"
import Hero from "../components/ui/hero"
import Section from "../components/ui/section"
import Input from "../components/ui/form/input"
import Textarea from "../components/ui/form/textarea"
import CheckBox from "../components/ui/form/checkbox"
import Button from "../components/ui/form/button"
import PrivacyLink from "../components/ui/link/privacy-link"

class ContactPage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      active: false,
      loading: false,
      privacy: false,
      captcha: null,
      error: false,
      complete: false,
      name: "",
      email: "",
      message: ""
    }

    ReCaptchaLoader()
  }

  handleClick = () => {
    if (this.state.privacy && this.state.captcha) {
      this.setState(() => {
        return {
          active: true,
          loading: true
        }
      })

      const data = new FormData()
      data.set('name', this.state.name)
      data.set('email', this.state.email)
      data.set('message', this.state.message)
      data.set('g-recaptcha', this.state.captcha)

      axios.post('https://contact.pittica.com/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => {
          this.setState({
            loading: false,
            error: false,
            complete: true,
            captcha: null
          })
        })
        .catch(res => {
          this.setState({
            active: false,
            loading: false,
            error: true,
            complete: true,
            captcha: null
          })
        })
    }
  }

  handleInputChange = e => {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handlePrivacy = (e) => {
    let checked = e.target.checked

    this.setState(() => {
      return {
        privacy: checked
      }
    })
  }

  verifyCallback = (token) => {
    this.setState(() => {
      return {
        captcha: token
      }
    })
  }

  render() {
    return (
      <Layout location={this.props.location} title="Contatti">
        <Hero title="Contatti" subtitle="Contatta Pittica" />
        <Airplane active={this.state.active}>
          <Section>
            {!this.state.complete && (
              <form method="post">
                <div className="columns">
                  <div className="column">
                    <Input name="name" label="Nome" onChange={this.handleInputChange} />
                  </div>
                  <div className="column">
                    <Input type="email" name="email" label="E-Mail" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <Textarea label="Messaggio" name="message" onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <CheckBox name="privacy" onChange={this.handlePrivacy}>
                      Dichiaro di aver letto l'<PrivacyLink>informativa sulla privacy</PrivacyLink> e autorizzo il trattamento dei miei dati personali ai sensi del Dlgs. 196 del 30 giugno 2003 e dell'art. 13 GDPR (Regolamento UE 2016/679) per finalità di contatto.
                    </CheckBox>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <ReCaptcha
                      action="homepage"
                      sitekey="6Ldq-_UUAAAAACZQEpZvFdd2QkwzQxvdHsVpEKVA"
                      verifyCallback={this.verifyCallback}
                    />
                  </div>
                  <div className="column">
                    <Button label="Invia" onClick={this.handleClick} loading={this.state.loading} />
                  </div>
                </div>
              </form>
            )}
            {this.state.complete && (
              <div className={classNames({
                notification: true,
                "is-info": !this.state.error,
                "is-danger": this.state.error
              })}>
                {!this.state.error && (
                  <>
                    <h3>Messaggio inviato!</h3>
                    <p>Sarai ricontattato nel più breve tempo possibile.</p>
                    <p>Grazie per averci contattato.</p>
                  </>
                )}
                {this.state.error && (
                  <>
                    <h3>Messaggio non inviato!</h3>
                    <p>C'è stato un problema tecnico nell'invio del tuo messaggio.</p>
                    <p>Ci scusiamo per l'inconveniente.</p>
                  </>
                )}
              </div>
            )}
          </Section>
        </Airplane>
      </Layout>
    )
  }
}

export default ContactPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
