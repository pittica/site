import React from "react"
import { graphql } from "gatsby"

import PostLayout from "../../components/layout/post-layout"
import ArticleHeader from "../../components/ui/article/article-header"
import Section from "../../components/ui/section"
import AssetsTechnologies from "../../components/sections/assets-technologies"

import "../../scss/ui/_post.scss"

export default class PortfolioPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const image = post.frontmatter.image
      ? post.frontmatter.image.childImageSharp.sizes.src
      : null
    return (
      <PostLayout
        title={post.frontmatter.title}
        post={post}
        location={this.props.location}
      >
        <article className="blog-post">
          <ArticleHeader image={image}>
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">{post.frontmatter.title}</h1>
                  <h2 className="subtitle">{post.frontmatter.description}</h2>
                </div>
              </div>
            </section>
          </ArticleHeader>
          <div className="container">
            <section
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <Section>
              <h3>Tecnologie</h3>
              <AssetsTechnologies
                entries={post.frontmatter.techologies}
                centered={false}
              />
            </Section>
            <Section>
              <h3>URL</h3>
              <a
                href={post.frontmatter.url}
                title={post.frontmatter.title}
                target="_system"
              >
                {post.frontmatter.url}
              </a>
            </Section>
          </div>
        </article>
      </PostLayout>
    )
  }
}

export const pageQuery = graphql`
  query PortfolioPostTemplate($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
        techologies
        url
        image {
          childImageSharp {
            sizes(maxWidth: 1280) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
