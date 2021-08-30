import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import classNames from "classnames"
import ReCaptcha from "@pittica/gatsby-plugin-recaptcha"
import validator from "validator"

import Button from "../components/ui/form/button"
import CheckBox from "../components/ui/form/checkbox"
import Input from "../components/ui/form/input"
import PrivacyLink from "../components/ui/link/privacy-link"
import Section from "../components/ui/section"
import Textarea from "../components/ui/form/textarea"

export default function ContactForm({ onLoading, id }) {
  const [loading, setLoading] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [error, setError] = useState(false)
  const [complete, setComplete] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [validation, setValidation] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = (captcha) => {
    if (privacy && captcha && validation) {
      setLoading(true)

      if (onLoading) {
        onLoading(true)
      }

      const data = new FormData()
      data.set("name", name)
      data.set("email", email)
      data.set("message", message)
      data.set("g-recaptcha", captcha)

      axios
        .post("https://contact.pittica.com/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(() => {
          setError(false)
          setLoading(false)
          setComplete(true)
          setSubmitted(false)

          if (onLoading) {
            onLoading(true)
          }
        })
        .catch(() => {
          setError(true)
          setLoading(false)
          setComplete(true)
          setSubmitted(false)

          if (onLoading) {
            onLoading(false)
          }
        })
    }
  }

  const handleInputChange = (e) => {
    const target = e.target

    if (target.type === "email") {
      setValidation(validator.isEmail(target.value))
    }

    switch (target.name) {
      case "name":
        setName(target.value)
        return false
      case "email":
        setEmail(target.value)
        return false
      case "message":
        setMessage(target.value)
        return false
      default:
        return false
    }
  }

  return (
    <Section>
      {!complete && (
        <form method="post">
          <div className="columns">
            <div className="column">
              <Input name="name" label="Nome" onChange={handleInputChange} />
            </div>
            <div className="column">
              <Input
                type="email"
                name="email"
                label="E-Mail"
                onChange={handleInputChange}
                className={classNames({
                  "is-danger": !validation.email,
                })}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <Textarea
                label="Messaggio"
                name="message"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <CheckBox
                name="privacy"
                onChange={(e) => setPrivacy(e.target.checked)}
              >
                Dichiaro di aver letto l'
                <PrivacyLink>informativa sulla privacy</PrivacyLink> e autorizzo
                il trattamento dei miei dati personali ai sensi del Dlgs. 196
                del 30 giugno 2003 e dell'art. 13 GDPR (Regolamento UE 2016/679)
                per finalità di contatto.
              </CheckBox>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <ReCaptcha
                action="homepage"
                siteKey="6Ldq-_UUAAAAACZQEpZvFdd2QkwzQxvdHsVpEKVA"
                onVerify={(token) => submit(token)}
                submitted={submitted}
                id={`${id}-recaptcha`}
              />
            </div>
            <div className="column">
              <Button
                label="Invia"
                onClick={() => setSubmitted(true)}
                loading={loading}
              />
            </div>
          </div>
        </form>
      )}
      {complete && (
        <div
          className={classNames("notification", {
            "is-info": !error,
            "is-danger": error,
          })}
        >
          {!error ? (
            <div>
              <h3>Messaggio inviato!</h3>
              <p>Sarai ricontattato nel più breve tempo possibile.</p>
              <p>Grazie per averci contattato.</p>
            </div>
          ) : (
            <div>
              <h3>Messaggio non inviato!</h3>
              <p>C'è stato un problema tecnico nell'invio del tuo messaggio.</p>
              <p>Ci scusiamo per l'inconveniente.</p>
            </div>
          )}
        </div>
      )}
    </Section>
  )
}

ContactForm.propTypes = {
  onLoading: PropTypes.func,
  id: PropTypes.string,
}

ContactForm.defaultProps = {
  id: "contact-form",
}
