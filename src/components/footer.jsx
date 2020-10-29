import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import TrustpilotReviews from "@pittica/gatsby-plugin-trustpilot-widget"
import Sign from "./ui/sign"
import PrivacyLink from "./ui/link/privacy-link"
import Section from "./ui/section"

import "../scss/ui/_footer.scss"

const Footer = () => {
  const { site, siteBuildMetadata } = useStaticQuery(
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
              taxId
              vatId
              registryId
            }
            locale {
              language
              culture
            }
            legal {
              privacy
              terms
              cookies
            }
            appearance {
              accent
              background
              theme
            }
          }
        }
        siteBuildMetadata {
          fields {
            seo {
              socials {
                twitter {
                  username
                  site
                }
                linkedin {
                  page
                }
                github {
                  username
                }
                instagram {
                  username
                }
                facebook {
                  page
                  app
                }
              }
            }
          }
        }
      }
    `
  )

  const owner = site.siteMetadata.organization
  const appearance = site.siteMetadata.appearance
  const socials = siteBuildMetadata.fields.seo.socials
  const legal = site.siteMetadata.legal

  let tax = null
  let email = null

  if (owner.taxId === owner.vatId) {
    tax = (
      <div>
        <span className="has-text-primary">Codice Fiscale / Partita IVA</span>{" "}
        {owner.vatId}
      </div>
    )
  } else {
    tax = (
      <>
        <div>
          <span className="has-text-primary">Codice Fiscale</span> {owner.taxId}
        </div>
        <div>
          <span className="has-text-primary">Partita IVA</span> {owner.vatId}
        </div>
      </>
    )
  }

  if (owner.email) {
    email = (
      <div>
        <span className="has-text-primary">E-Mail</span>{" "}
        <a href={"mailto:" + owner.email}>{owner.email}</a>
      </div>
    )
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifths">
            <Sign color={appearance.background} />
          </div>
          <div className="column is-two-fifths">
            <h3>{owner.company}</h3>
            <div className="bracket-group">
              <div className="icon">
                <i className="icon-pittica-marker"></i>
              </div>
              {owner.address}
              <br />
              {owner.zipCode} {owner.city} ({owner.province})<br />
              {owner.country}
            </div>
            {tax}
            <div>
              <span className="has-text-primary">REA</span> {owner.registryId}
            </div>
            {email}
          </div>
          <div className="column is-one-fifths">
            <ul>
              <li>
                <PrivacyLink />
              </li>
              <li>
                <Link to={legal.cookies}>Politica sui Cookie</Link>
              </li>
              <li>
                <Link to={legal.terms}>Termini e Condizioni</Link>
              </li>
              <li>
                <Link to={"/legal"}>Note Legali</Link>
              </li>
            </ul>
          </div>
          <div className="column is-one-fifths">
            <h2>Seguici</h2>
            <ul className="social-follow">
              <li>
                <a
                  href={
                    "https://www.linkedin.com/company/" + socials.linkedin.page
                  }
                  title="LinkedIn"
                >
                  <i className="icon-pittica-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={"https://github.com/" + socials.github.username}
                  title="GitHub"
                >
                  <i className="icon-pittica-github"></i>
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.facebook.com/" + socials.facebook.page + "/"
                  }
                  title="Facebook"
                >
                  <i className="icon-pittica-facebook"></i>
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Section>
              <TrustpilotReviews
                language={site.siteMetadata.locale.language}
                culture={site.siteMetadata.locale.culture}
                theme="dark"
              />
            </Section>
          </div>
        </div>
        <div className="columns">
          <div className="column is-five-fifths">
            © {new Date().getFullYear()}, {owner.company}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
