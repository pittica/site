import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import classNames from "classnames"

import Airplane from "../components/ui/gfx/airplane"
import ContactForm from "../components/contact-form"
import Hero from "../components/ui/hero"
import Layout from "../components/layout/layout"
import Section from "../components/ui/section"

export default function Contact({ location }) {
  const [loading, setLoading] = useState(false)

  const {
    site: {
      siteMetadata: {
        organization: {
          company,
          address,
          zipCode,
          city,
          province,
          country,
          email,
        },
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            organization {
              company
              address
              zipCode
              city
              province
              country
              email
            }
          }
        }
      }
    `
  )

  return (
    <Layout location={location} title="Contatti">
      <Hero title="Contatti" subtitle="Contatta Pittica" />
      <Section>
        <h3>{company}</h3>
        <div className="columns">
          <div className={classNames("column", "is-half")}>
            {address}
            <br />
            {zipCode} {city} ({province})<br />
            {country}
          </div>
          <div className={classNames("column", "is-half")}>
            <span className="has-text-primary">E-Mail</span>{" "}
            <a href={`mailto:${email}`} title={email}>
              {email}
            </a>
          </div>
        </div>
      </Section>
      <Airplane active={loading}>
        <ContactForm onLoading={(active) => setLoading(active)} id="contact" />
      </Airplane>
    </Layout>
  )
}
