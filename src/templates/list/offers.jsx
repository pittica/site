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
      title="Offerte"
      description="Le nostre proposte"
    />
  )
}

export const pageQuery = graphql`
  query OffersListTemplate($skip: Int!, $limit: Int!) {
    posts: allGraphCmsOffer(
      filter: { stage: { eq: PUBLISHED } }
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
      totalCount
    }
  }
`
