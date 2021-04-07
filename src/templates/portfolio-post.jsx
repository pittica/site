import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import PostContent from '../components/ui/article/post-content';
import PostLayout from '../components/layout/post-layout';
import Section from '../components/ui/section';
import Technologies from '../components/ui/technologies';
import PostHeader from '../components/ui/article/post-header';

export default class PortfolioPostTemplate extends Component {
  render() {
    const post = this.props.data.graphCmsPortfolio;
    const image = getImage(post.image.localFile.childImageSharp);
    const cover = image ? image.images.fallback.src : null;

    return (
      <PostLayout title={post.title} post={post} image={cover} location={this.props.location}>
        <article className="blog-post">
          <PostHeader image={cover} post={post} />
          <PostContent>{post.content}</PostContent>
          {post.technologies &&
          post.technologies.length > 0 && (
            <Section title="Tecnologie">
              <Technologies nodes={post.technologies} />
            </Section>
          )}
          {post.link && (
            <Section title="URL">
              <a href={post.link} title={post.title} target="_system">
                {post.link}
              </a>
            </Section>
          )}
        </article>
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query PortfolioPostTemplate($slug: String!) {
    graphCmsPortfolio(stage: { eq: PUBLISHED }, locale: { eq: it }, slug: { eq: $slug }) {
      title
      slug
      link
      content {
        markdownNode {
          childMdx {
            body
          }
        }
      }
      technologies {
        logo {
          localFile {
            publicURL
          }
        }
        link
        name
      }
      description
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1920, height: 1080, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
