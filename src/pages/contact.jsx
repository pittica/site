import React from "react"
import { graphql } from "gatsby"
import classNames from "classnames"

import Section from "../components/ui/section"
import Layout from "../layouts/layout"
import ContactForm from "../components/contact-form"

export default function Contact({
  location,
  data: {
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
  },
}) {
  return (
    <Layout
      location={location}
      title="Contatti"
      description="Mettiti in contatto con noi"
      header={true}
    >
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
      <ContactForm
        region="eu1"
        portalId="25034302"
        formId="13783600-3a0e-4ed1-8233-d2a51d7c7c31"
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ContactPage {
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
