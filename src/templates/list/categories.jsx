import React from "react"
import { graphql } from "gatsby"

import Grid from "../../layouts/grid"

export default function Categories({
  data: {
    category: { name },
    posts: { nodes },
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
  query CategoriesListTemplate($slug: String, $limit: Int!, $skip: Int!) {
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      sort: { fields: date, order: DESC }
      filter: {
        categories: { elemMatch: { slug: { eq: $slug } } }
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
    category: graphCmsCategory(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      name
    }
  }
`
