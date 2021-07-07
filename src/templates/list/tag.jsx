import React from "react"
import { graphql } from "gatsby"

import CategoryLayout from "../../components/layout/category-layout"

export default function Tag({
  data: {
    tag: { name },
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <CategoryLayout
      context={pageContext}
      nodes={nodes}
      label={`Tag "${name}"`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query TagListTemplate(
    $slug: String
    $limit: Int!
    $skip: Int!
    $locale: GraphCMS_Locale!
  ) {
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      sort: { fields: updatedAt, order: DESC }
      filter: {
        tags: { elemMatch: { slug: { eq: $slug }, locale: { eq: $locale } } }
        locale: { eq: $locale }
        stage: { eq: PUBLISHED }
      }
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
      stage: { eq: PUBLISHED }
    ) {
      name
    }
  }
`
