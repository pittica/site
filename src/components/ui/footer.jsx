import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import classNames from "classnames"
import TrustpilotReviews from "@pittica/gatsby-plugin-trustpilot-widget"
import { CookiesSettings } from "@pittica/gatsby-plugin-cookiehub"
import { SocialFollow } from "@pittica/gatsby-plugin-seo"
import { Logo } from "@pittica/art"

import PrivacyLink from "./link/privacy-link"
import Section from "./section"

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
            {organization.taxId && (
              <div>
                <span className="has-text-primary">Codice Fiscale</span>{" "}
                {organization.taxId}
              </div>
            )}
            {organization.vatId && (
              <div>
                <span className="has-text-primary">Partita IVA</span>{" "}
                {organization.vatId}
              </div>
            )}
            {organization.registryId && (
              <div>
                <span className="has-text-primary">REA</span>{" "}
                {organization.registryId}
              </div>
            )}
            {organization.shareCapital && (
              <div>
                <span className="has-text-primary">Capitale Sociale</span>{" "}
                {organization.shareCapital}
              </div>
            )}
            {organization.email && (
              <div>
                <span className="has-text-primary">E-Mail</span>{" "}
                <a href={`mailto:${organization.email}`}>
                  {organization.email}
                </a>
              </div>
            )}
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
            <div className="has-text-centered-mobile">
              <a
                href="https://www.assintel.it/soci/pittica_srls/"
                target="_new"
              >
                <img
                  src="/assets/assintel.png"
                  alt="Assintel"
                  width="258"
                  height="48"
                />
              </a>
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
