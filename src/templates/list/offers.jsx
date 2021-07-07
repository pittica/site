import React from "react"
import { graphql } from "gatsby"

import StaticLayout from "../../components/layout/static-layout"

export default function Offers({
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
      title="Offerte"
      description="Le nostre proposte"
    />
  )
}

export const pageQuery = graphql`
  query OffersListTemplate(
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale!
  ) {
    posts: allGraphCmsOffer(
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
      totalCount
    }
  }
`
