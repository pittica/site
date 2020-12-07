import React from "react"
import { graphql } from "gatsby"

import { Paginator } from "@pittica/gatsby-plugin-blog"

import Layout from "../../components/layout/layout"
import Header from "../../components/ui/header"
import Section from "../../components/ui/section"
import ArticleGrid from "../../components/ui/article/article-grid"

import pages from "../../data/pages.json"

export default class PortfolioListTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props

    return (
      <Layout
        location={this.props.location}
        title={pages[pageContext.slug].title}
      >
        <Header
          title={pages[pageContext.slug].title}
          subtitle={pages[pageContext.slug].description}
        />
        <Section>
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(({ node }) => {
              return (
                <div className="column is-one-third" key={node.fields.slug}>
                  <ArticleGrid node={node} />
                </div>
              )
            })}
          </div>
        </Section>
        <Paginator context={pageContext} className="bottom-nav" />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query PortfolioListTemplate($skip: Int!, $limit: Int!, $regex: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: $regex } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
            description
            image {
              childImageSharp {
                sizes(maxWidth: 630) {
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
