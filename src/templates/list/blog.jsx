import React from "react"
import { graphql } from "gatsby"

import Grid from "../../layouts/grid"

export default function Blog({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <Grid
      context={pageContext}
      nodes={nodes}
      label="Blog"
      location={location}
      description="Approfondimenti dal mondo digitale"
    />
  )
}

export const pageQuery = graphql`
  query BlogListTemplate($skip: Int!, $limit: Int!, $locale: GraphCMS_Locale!) {
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      filter: { locale: { eq: $locale }, stage: { eq: PUBLISHED } }
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
