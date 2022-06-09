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
      title={t("Services")}
      description={t("Our services")}
    />
  )
}

export const pageQuery = graphql`
  query ServicesListTemplate($skip: Int!, $limit: Int!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    posts: allGraphCmsService(
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
    }
  }
`
