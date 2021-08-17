import React from "react"
import { graphql } from "gatsby"

import About from "../components/sections/about"
import Blog from "../components/sections/blog"
import Partners from "../components/sections/partners"
import Layout from "../components/layout/layout"

export default function Index({
  data: {
    posts: { nodes },
  },
  location,
}) {
  return (
    <Layout location={location}>
      <About />
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
