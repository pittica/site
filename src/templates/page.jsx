import React, { Component } from 'react';
import { graphql } from 'gatsby';

import PostContent from '../components/ui/article/post-content';
import Layout from '../components/layout/layout';
import Hero from '../components/ui/hero';

export default class PageTemplate extends Component {
  render() {
    const post = this.props.data.graphCmsPage;

    return (
      <Layout title={post.title} post={post} description={post.subtitle} location={this.props.location}>
        <article className="blog-post">
          <Hero title={post.title} subtitle={post.subtitle} />
          <PostContent>{post.content}</PostContent>
        </article>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    graphCmsPage(slug: { eq: $slug }, stage: { eq: PUBLISHED }, locale: { eq: it }) {
      id
      title
      subtitle
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
