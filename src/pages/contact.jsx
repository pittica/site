import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import classNames from "classnames"

import ContactForm from "../components/contact-form"
import Hero from "../components/ui/hero"
import Layout from "../components/layout/layout"
import Section from "../components/ui/section"

export default function Contact({ location }) {
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
      <Hero title="Contatti" subtitle="Mettiti in contatto con noi" />
      <Section>
        <h3>{company}</h3>
        <div className="columns">
          <div className={classNames("column")}>
            <p>
              {address}
              <br />
              {zipCode} {city} ({province})<br />
              {country}
            </p>
            <p>
              <span className="has-text-primary">E-Mail</span>{" "}
              <a href={`mailto:${email}`} title={email}>
                {email}
              </a>
            </p>
          </div>
        </div>
      </Section>
      <ContactForm id="contact" />
    </Layout>
  )
}
