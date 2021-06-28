import React from "react"
import { graphql } from "gatsby"

import StaticLayout from "../../components/layout/static-layout"

export default function Services({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <StaticLayout
      context={pageContext}
      location={location}
      nodes={nodes}
      title="Servizi"
      description="I nostri servizi"
    />
  )
}

export const pageQuery = graphql`
  query ServicesListTemplate($skip: Int!, $limit: Int!) {
    posts: allGraphCmsService(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        title
        slug
        description
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
      }
    }
  }
`
