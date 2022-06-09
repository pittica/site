import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Grid from "../../layouts/grid"

export default function Blog({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  const { t } = useTranslation()

  return (
    <Grid
      location={location}
      context={pageContext}
      nodes={nodes}
      label={t("Blog")}
      description={t("Insights from the digital world")}
    />
  )
}

export const pageQuery = graphql`
  query BlogListTemplate(
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale!
    $language: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      filter: { stage: { eq: PUBLISHED }, locale: { eq: $locale } }
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
        locale
      }
    }
  }
`
