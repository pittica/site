import React from "react"
import { graphql } from "gatsby"

import Blog from "../components/sections/blog"
import FeatureLink from "../components/ui/link/feature-link"
import Partnerships from "../components/sections/partnerships"
import Section from "../components/ui/section"
import Underground from "../components/ui/gfx/underground"
import Layout from "../layouts/layout"

export default function Index({
  data: {
    site: {
      siteMetadata: {
        appearance: { accent, theme },
      },
    },
    posts: { nodes },
    parterships,
  },
  location,
}) {
  return (
    <Layout
      location={location}
      title="Pittica"
      subtitle="Il tuo partner per la trasformazione digitale"
    >
      <Underground accent={accent} theme={theme}>
        <h1>Pittica</h1>
        <h2>Il tuo partner per la trasformazione digitale</h2>
        <FeatureLink to="/about" label="Scopri" />
      </Underground>
      <Blog nodes={nodes} />
      <Section>
        <Partnerships nodes={parterships.nodes} />
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        appearance {
          accent
          theme
        }
      }
    }
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
    parterships: allGraphCmsPartnership {
      nodes {
        id
        name
        page {
          slug
        }
        link
        logo {
          localFile {
            extension
            publicURL
          }
          height
          width
          data
        }
        logoUrl
      }
    }
  }
`
