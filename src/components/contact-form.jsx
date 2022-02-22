import React from "react"
import PropTypes from "prop-types"
import { Form } from "@pittica/gatsby-plugin-hubspot"

import Section from "../components/ui/section"

export default function ContactForm({
  region,
  portalId,
  formId,
  locale,
  title,
  subtitle,
}) {
  return (
    <Section title={title} subtitle={subtitle}>
      <Form
        region={region}
        portalId={portalId}
        formId={formId}
        locale={locale}
      />
    </Section>
  )
}

ContactForm.propTypes = {
  region: PropTypes.string.isRequired,
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  locale: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
