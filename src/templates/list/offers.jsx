import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Directory from "../../layouts/directory"

export default function Offers({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  const { t } = useTranslation()

  return (
    <Directory
      nodes={nodes}
      location={location}
      context={pageContext}
      title={t("Offers")}
      description={t("Our offers")}
    />
  )
}

export const pageQuery = graphql`
  query OffersListTemplate($skip: Int!, $limit: Int!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
