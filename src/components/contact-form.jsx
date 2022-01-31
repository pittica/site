import React, { useEffect } from "react"
import PropTypes from "prop-types"

import Section from "../components/ui/section"

export default function ContactForm({
  region,
  portalId,
  formId,
  title,
  subtitle,
}) {
  useEffect(() => {
    if (typeof window.hbspt !== "undefined") {
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: ".hubspot-form",
      })
    }

    return () => {
      if (typeof document !== "undefined") {
        const forms = document.getElementsByClassName("hs-form-iframe")

        for (let i = 0; i < forms.length; i++) {
          forms[i].parentNode.removeChild(forms[i])
        }
      }
    }
  })

  return (
    <Section title={title} subtitle={subtitle}>
      <div className="hubspot-form" />
    </Section>
  )
}

ContactForm.propTypes = {
  region: PropTypes.string.isRequired,
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
