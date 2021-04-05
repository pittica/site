import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import classnames from 'classnames';
import TrustpilotReviews from '@pittica/gatsby-plugin-trustpilot-widget';

import Sign from './ui/sign';
import PrivacyLink from './ui/link/privacy-link';
import Section from './ui/section';

import '../scss/ui/_footer.scss';

const Footer = () => {
  const {
    site: { siteMetadata: { organization, appearance, locale, legal } },
    siteBuildMetadata: { fields: { seo: { socials } } }
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
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className={classnames('column', 'is-one-fifths')}>
            <Sign color={appearance.background} />
          </div>
          <div className={classnames('column', 'is-two-fifths')}>
            <h3>{organization.company}</h3>
            <div className="bracket-group">
              <div className="icon">
                <i className="icon-pittica-marker" />
              </div>
              {organization.address}
              <br />
              {organization.zipCode} {organization.city} ({organization.province})<br />
              {organization.country}
            </div>
            {organization.taxId && (
              <div>
                <span className="has-text-primary">Codice Fiscale</span> {organization.taxId}
              </div>
            )}
            {organization.vatId && (
              <div>
                <span className="has-text-primary">Partita IVA</span> {organization.vatId}
              </div>
            )}
            {organization.registryId && (
              <div>
                <span className="has-text-primary">REA</span> {organization.registryId}
              </div>
            )}
            {organization.email && (
              <div>
                <span className="has-text-primary">E-Mail</span>{' '}
                <a href={`mailto:${organization.email}`}>{organization.email}</a>
              </div>
            )}
          </div>
          <div className={classnames('column', 'is-one-fifths')}>
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
                <Link to="/legal">Note Legali</Link>
              </li>
            </ul>
          </div>
          <div className={classnames('column', 'is-one-fifths')}>
            <h2>Seguici</h2>
            <ul className="social-follow">
              <li>
                <a href={new URL(socials.linkedin.page, 'https://www.linkedin.com/company/').href} title="LinkedIn">
                  <i className="icon-pittica-linkedin" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={new URL(socials.github.username, 'https://github.com/').href} title="GitHub">
                  <i className="icon-pittica-github" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href={new URL(socials.facebook.page, 'https://www.facebook.com/').href} title="Facebook">
                  <i className="icon-pittica-facebook" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Section>
              <TrustpilotReviews language={locale.language} culture={locale.culture} theme="dark" />
            </Section>
          </div>
        </div>
        <div className="columns">
          <div className={classnames('column', 'is-five-fifths')}>
            © {new Date().getFullYear()}, {organization.company}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
