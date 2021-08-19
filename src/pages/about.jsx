import React from "react"
import { graphql } from "gatsby"
import classnames from "classnames"
import { commalify } from "@pittica/gatsby-plugin-utils"

import Card from "../components/ui/card"
import FeatureLink from "../components/ui/link/feature-link"
import ImageLink from "../components/ui/image/image-link"
import Layout from "../components/layout/layout"
import Partners from "../components/sections/partners"
import Renderer from "../mdx/renderer"
import Section from "../components/ui/section"
import Technologies from "../components/ui/technologies"

import cover from "../images/about/cover.svg"
import breaker from "../images/about/breaker.svg"

export default function About({ location, data }) {
  return (
    <Layout location={location} title="About">
      <figure className={classnames("image", "is-128x128")}>
        <img src={cover} alt="About" width="1080" height="1080" />
      </figure>
      {data.about && (
        <Section title={data.about.title} subtitle={data.about.subtitle}>
          <Renderer>{data.about.content}</Renderer>
        </Section>
      )}
      {data.people.nodes.length > 0 && (
        <Section title="Faces">
          <div className="columns">
            {data.people.nodes.map((person, index) => (
              <div
                className={classnames("column", "has-text-centered")}
                key={"person-" + index}
              >
                <Card image={person.image} title={person.name}>
                  <h5 className="subtitle">{person.name}</h5>
                  {person.roles.length > 0 && (
                    <h6>{commalify(person.roles)}</h6>
                  )}
                  {person.linkedIn && (
                    <a href={person.linkedIn} title="LinkedIn" target="_new">
                      <i className="icon-pittica-linkedin" />
                    </a>
                  )}
                  <Renderer>{person.bio}</Renderer>
                </Card>
              </div>
            ))}
          </div>
        </Section>
      )}
      <figure className={classnames("image", "is-128x128")}>
        <img src={breaker} alt="About" width="1080" height="1080" />
      </figure>
      {data.services && (
        <Section title={data.services.title} subtitle={data.services.subtitle}>
          <Renderer>{data.services.content}</Renderer>
        </Section>
      )}
      <div className="has-text-centered">
        <FeatureLink to="/services" label="Vedi i nostri servizi" />
      </div>
      {data.technologies.nodes.length > 0 && (
        <Section title="Tecnologie" subtitle="Con cosa lavoriamo?">
          <Technologies nodes={data.technologies.nodes} />
        </Section>
      )}
      {data.partners.nodes.length > 0 && (
        <Section
          title="Rete Aziendale"
          subtitle="Le Aziende con cui collaboriamo"
        >
          <div className={classnames("columns", "is-multiline")}>
            {data.partners.nodes.map((node, i) => {
              return (
                <div
                  className={classnames("column", "is-one-third", "p-6")}
                  key={`partner-${i}`}
                >
                  <ImageLink
                    link={node.link}
                    title={node.name}
                    image={node.logo}
                  />
                </div>
              )
            })}
          </div>
        </Section>
      )}
      <Partners title="Partner" subtitle="Le nostre Partnership" />
    </Layout>
  )
}

export const pageQuery = graphql`
  fragment GraphCMS_SectionFragment on GraphCMS_Section {
    title
    subtitle
    content {
      markdownNode {
        childMdx {
          body
        }
      }
    }
  }

  query {
    technologies: allGraphCmsTechnology(filter: { stage: { eq: PUBLISHED } }) {
      nodes {
        link
        name
        logo {
          localFile {
            publicURL
          }
        }
      }
    }
    partners: allGraphCmsPartner(filter: { stage: { eq: PUBLISHED } }) {
      nodes {
        link
        name
        logo {
          localFile {
            publicURL
          }
        }
      }
    }
    about: graphCmsSection(slug: { eq: "about" }, stage: { eq: PUBLISHED }) {
      ...GraphCMS_SectionFragment
    }
    services: graphCmsSection(
      slug: { eq: "services" }
      stage: { eq: PUBLISHED }
    ) {
      ...GraphCMS_SectionFragment
    }
    people: allGraphCmsPerson(filter: { stage: { eq: PUBLISHED } }) {
      nodes {
        name
        roles {
          name
        }
        linkedIn
        bio {
          markdownNode {
            childMdx {
              body
            }
          }
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 240
                height: 240
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
            extension
          }
        }
      }
    }
  }
`
