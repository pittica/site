import React from "react"
import { graphql } from "gatsby"

import Directory from "../../layouts/directory"

export default function Offers({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <Directory
      nodes={nodes}
      location={location}
      context={pageContext}
      title="Servizi"
      description="I nostri servizi"
    />
  )
}

export const pageQuery = graphql`
  query ServicesListTemplate(
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale!
  ) {
    posts: allGraphCmsService(
      filter: { locale: { eq: $locale }, stage: { eq: PUBLISHED } }
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
