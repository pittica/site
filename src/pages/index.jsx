import React from "react"
import { graphql } from "gatsby"
import classnames from "classnames"

import Blog from "../components/sections/blog"
import FeatureLink from "../components/ui/link/feature-link"
import Layout from "../components/layout/layout"
import Partners from "../components/sections/partners"
import Section from "../components/ui/section"
import SectionContainer from "../components/ui/section-container"
import Underground from "../components/ui/gfx/underground"

export default function Index({
  data: {
    posts: { nodes },
  },
  location,
}) {
  return (
    <Layout location={location}>
      <SectionContainer left={false}>
        <Underground />
        <Section title="Pittica" subtitle="Mad Scientists @ Work">
          <div className="container">
            <div className={classnames("columns", "is-multiline")}>
              <div
                className={classnames(
                  "column",
                  "is-two-thirds",
                  "is-offset-one-third"
                )}
              >
                <p>
                  Il tuo partner per la <strong>trasformazione digitale</strong>
                  .
                </p>
                <FeatureLink to="/about" label="Leggi" />
              </div>
            </div>
          </div>
        </Section>
      </SectionContainer>
      <Blog posts={nodes} />
      <Partners />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    posts: allGraphCmsPost(
      limit: 3
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        id
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 640
                height: 440
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        slug
        excerpt
        date: formattedDate
        title
      }
    }
  }
`
