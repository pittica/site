import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import classNames from "classnames"
import TrustpilotReviews from "@pittica/gatsby-plugin-trustpilot-widget"
import { CookiesSettings } from "@pittica/gatsby-plugin-cookiehub"
import { SocialFollow } from "@pittica/gatsby-plugin-seo"
import { Logo } from "@pittica/art"

import PrivacyLink from "./link/privacy-link"
import Section from "./section"
import Pair from "./pair"

import "../../scss/ui/_footer.scss"

export default function Footer() {
  const {
    site: {
      siteMetadata: { organization, appearance, locale },
    },
    legal,
  } = useStaticQuery(
    graphql`
      query Footer {
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
              taxId
              vatId
              registryId
              shareCapital
            }
            locale {
              language
              culture
            }
            appearance {
              accent
              background
              theme
            }
          }
        }
        legal: allGraphCmsLegal(
          filter: { footer: { eq: true }, stage: { eq: PUBLISHED } }
        ) {
          nodes {
            slug
            title
          }
        }
      }
    `
  )

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div
            className={classNames(
              "column",
              "is-4",
              "has-text-right",
              "has-text-left-mobile"
            )}
          >
            <Logo color={appearance.background} />
          </div>
          <div className={classNames("column", "is-4")}>
            <h3>{organization.company}</h3>
            <div className="bracket-group">
              <div className="icon">
                <i className="icon-pittica-marker" />
              </div>
              {organization.address}
              <br />
              {organization.zipCode} {organization.city} (
              {organization.province})<br />
              {organization.country}
            </div>
            <Pair label="Codice Fiscale" value={organization.taxId} />
            <Pair label="Partita IVA" value={organization.vatId} />
            <Pair label="REA" value={organization.registryId} />
            <Pair label="Capitale Sociale" value={organization.shareCapital} />
            <Pair label="E-Mail" value={organization.email} />
          </div>
          <div className={classNames("column", "is-4")}>
            <div>
              <ul>
                <li>
                  <PrivacyLink />
                </li>
                <li>
                  <CookiesSettings label="Impostazioni Cookies" />
                </li>
                {legal.nodes.map((page, i) => (
                  <li key={`legal-${i}-${page.slug}`}>
                    <Link to={`/legal/${page.slug}`} title={page.title}>
                      {page.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/legal">Note Legali</Link>
                </li>
              </ul>
            </div>
            <div className="has-text-centered-mobile">
              <SocialFollow />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Section>
              <TrustpilotReviews
                language={locale.language}
                culture={locale.culture}
                theme="dark"
                username="pittica.com"
                template="5419b6a8b0d04a076446a9ad"
                business="5eaf034c658436000194e69b"
              />
            </Section>
          </div>
        </div>
        <div className="columns">
          <div className={classNames("column", "is-five-fifths")}>
            © {new Date().getFullYear()}, {organization.company}
          </div>
        </div>
      </div>
    </footer>
  )
}
