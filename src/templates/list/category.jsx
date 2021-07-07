import React from "react"
import { graphql } from "gatsby"

import CategoryLayout from "../../components/layout/category-layout"

export default function Category({
  data: {
    category: { name },
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <CategoryLayout
      context={pageContext}
      nodes={nodes}
      label={`Categoria "${name}"`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query CategoryListTemplate(
    $slug: String
    $limit: Int!
    $skip: Int!
    $locale: GraphCMS_Locale!
  ) {
    category: graphCmsCategory(
      slug: { eq: $slug }
      locale: { eq: $locale }
      stage: { eq: PUBLISHED }
    ) {
      name
    }
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: {
        categories: {
          elemMatch: { slug: { eq: $slug }, locale: { eq: $locale } }
        }
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
  }
`
