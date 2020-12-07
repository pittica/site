import React from "react"
import { graphql } from "gatsby"

import About from "../components/sections/about"
import Blog from "../components/sections/blog"
import Partners from "../components/sections/partners"
import Layout from "../components/layout/layout"
import Section from "../components/ui/section"

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location}>
        <About />
        <Blog posts={posts} />
        <Section>
          <Partners />
        </Section>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "^\/blog\/" } } }
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
              childImageSharp{
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
