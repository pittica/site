import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import PostLayout from '../../components/layout/post-layout';
import Section from '../../components/ui/section';
import AssetsTechnologies from '../../components/sections/assets-technologies';
import PostHeader from '../../components/ui/article/post-header';

export default class PortfolioPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const image = getImage(post.frontmatter.image);
    const cover = image ? image.images.fallback.src : null;

    return (
      <PostLayout title={post.frontmatter.title} post={post} image={cover} location={this.props.location}>
        <article className="blog-post">
          <PostHeader image={cover} post={post} />
          <div className="container">
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            <Section>
              <h3>Tecnologie</h3>
              <AssetsTechnologies entries={post.frontmatter.techologies} centered={false} />
            </Section>
            <Section>
              <h3>URL</h3>
              <a href={post.frontmatter.url} title={post.frontmatter.title} target="_system">
                {post.frontmatter.url}
              </a>
            </Section>
          </div>
        </article>
      </PostLayout>
    );
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
        description
        techologies
        url
        image {
          childImageSharp {
            gatsbyImageData(width: 1920, height: 1280, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
