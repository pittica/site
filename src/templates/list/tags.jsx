import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Grid from "../../layouts/grid"

export default function Tags({
  data: {
    posts: { nodes },
    tag: { name },
  },
  pageContext,
  location,
}) {
  const { t } = useTranslation()

  return (
    <Grid
      context={pageContext}
      nodes={nodes}
      label={name}
      description={t('Articles with tag "{{name}}"', { name })}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query TagsListTemplate(
    $slug: String!
    $limit: Int!
    $skip: Int!
    $locale: GraphCMS_Locale!
    $stage: GraphCMS_Stage!
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
      filter: {
        tags: { elemMatch: { slug: { eq: $slug }, stage: { eq: $stage } } }
        locale: { eq: $locale }
        stage: { eq: $stage }
      }
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
    tag: graphCmsTag(
      slug: { eq: $slug }
      locale: { eq: $locale }
      stage: { eq: $stage }
    ) {
      name
    }
  }
`
