import React, { Component } from 'react';
import { graphql } from 'gatsby';

import PostLayout from '../../components/layout/post-layout';
import ArticleHeader from '../../components/ui/article/article-header';

export default class LegalPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <PostLayout title={post.frontmatter.title} post={post} location={this.props.location}>
        <article className="blog-post">
          <ArticleHeader>
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
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </article>
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query LegalPostTemplate($slug: String!) {
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
      }
    }
  }
`;
