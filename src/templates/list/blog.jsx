import React from "react"
import { graphql } from "gatsby"
import classnames from "classnames"

import Layout from "../../components/layout/layout"
import Section from "../../components/ui/section"
import ArticleGrid from "../../components/ui/article/article-grid"
import ListNav from "../../components/nav/list-nav"

export default function Blog({
  data: {
    posts: { edges },
  },
  pageContext,
  location,
}) {
  return (
    <Layout location={location} title="Blog">
      <Section title="Blog" subtitle="Pittica says">
        <div className={classnames("columns", "is-multiline")}>
          {edges.map(({ node }) => {
            return (
              <div
                className={classnames("column", "is-one-third")}
                key={node.slug}
              >
                <ArticleGrid node={node} />
              </div>
            )
          })}
        </div>
      </Section>
      <ListNav context={pageContext} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    posts: allGraphCmsPost(
      limit: $limit
      skip: $skip
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
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
  }
`
