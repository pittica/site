import React from "react"
import { graphql } from "gatsby"

import { Paginator } from "@pittica/gatsby-plugin-blog"

import Layout from "../components/layout/layout"
import EmptyLayout from "../components/layout/empty-layout"
import Section from "../components/ui/section"
import Article from "../components/ui/article/article-grid"

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { name } = pageContext

  if (data.allMarkdownRemark.edges.length > 0) {
    return (
      <Layout location={location} title={`Categoria "${name}"`}>
        <Section title="Categoria" subtitle={name}>
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
        <Paginator context={pageContext} className="bottom-nav" />
      </Layout>
    )
  } else {
    return (
      <EmptyLayout location={location} title="Categoria" value={name}>
        Nessun Post Trovato
      </EmptyLayout>
    )
  }
}

export const pageQuery = graphql`
  query CategoryTemplate($name: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { categories: { in: [$name] } } }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
      }
      totalCount
      edges {
        node {
          fields {
            slug
            categories
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
