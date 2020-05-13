import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import EmptyLayout from "../components/layout/empty-layout"
import Section from "../components/ui/section"
import Article from "../components/ui/article/article-grid"

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { category } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <Layout location={location} title={`Categoria "${category}"`}>
        <Section title="Categoria" subtitle={category}>
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(({ node }) => {
              return (
                <div className="column is-one-third" key={node.fields.slug}>
                  <Article node={node} />
                </div>
              )
            })}
          </div>
        </Section>
      </Layout>
    )
  } else {
    return (
      <EmptyLayout location={location} title="Categoria" value={category}>
        Nessun Post Trovato
      </EmptyLayout>
    )
  }
}

export const pageQuery = graphql`
  query CategoryTemplate($category: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { in: [$category] } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
      totalCount
      edges {
        node {
          fields {
            slug
            tags
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
            description
            featuredImage {
              childImageSharp{
                sizes(maxWidth: 1280) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate
