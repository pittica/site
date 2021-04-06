import React, { Component } from 'react';
import { graphql } from 'gatsby';

import PostContent from '../components/ui/article/post-content';
import PostLayout from '../components/layout/post-layout';
import ArticleHeader from '../components/ui/article/article-header';

export default class LegalPostTemplate extends Component {
  render() {
    const post = this.props.data.graphCmsLegal;

    return (
      <PostLayout title={post.title} post={post} location={this.props.location}>
        <article className="blog-post">
          <ArticleHeader>
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">{post.title}</h1>
                  <h2 className="subtitle">{post.description}</h2>
                </div>
              </div>
            </section>
          </ArticleHeader>
          <PostContent>{post.content}</PostContent>
        </article>
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query LegalPostTemplate($slug: String!) {
    graphCmsLegal(stage: { eq: PUBLISHED }, locale: { eq: it }, slug: { eq: $slug }) {
      id
      title
      slug
      description
      content {
        markdownNode {
          childMdx {
            body
          }
        }
      }
    }
  }
`;
