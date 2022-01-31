import React from "react"
import { graphql } from "gatsby"

import Grid from "../../layouts/grid"

export default function Tags({
  data: {
    tag: { name },
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
      description={`Articoli con tag "${name}"`}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query TagsListTemplate($slug: String, $limit: Int!, $skip: Int!) {
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      sort: { fields: updatedAt, order: DESC }
      filter: {
        tags: { elemMatch: { slug: { eq: $slug } } }
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
    tag: graphCmsTag(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      name
    }
  }
`
