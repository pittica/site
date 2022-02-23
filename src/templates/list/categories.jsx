import React from "react"
import { graphql } from "gatsby"

import Grid from "../../layouts/grid"

export default function Categories({
  data: {
    posts: { nodes },
    category: { name },
  },
  pageContext,
  location,
}) {
  return (
    <Grid
      context={pageContext}
      nodes={nodes}
      label={name}
      description={`Articoli nella categoria "${name}"`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query CategoriesListTemplate(
    $slug: String!
    $limit: Int!
    $skip: Int!
    $locale: GraphCMS_Locale!
    $stage: GraphCMS_Stage!
  ) {
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      filter: {
        categories: { elemMatch: { slug: { eq: $slug } } }
        stage: { eq: $stage }
        locale: { eq: $locale }
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
    category: graphCmsCategory(
      slug: { eq: $slug }
      locale: { eq: $locale }
      stage: { eq: $stage }
    ) {
      name
    }
  }
`
