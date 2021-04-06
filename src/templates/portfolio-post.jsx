import React, { Component } from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import PostContent from '../components/ui/article/post-content';
import PostLayout from '../components/layout/post-layout';
import Section from '../components/ui/section';
import ImageLink from '../components/ui/image-link';
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
          <div className="container">
            {post.technologies &&
            post.technologies.length > 0 && (
              <Section subtitle="Tecnologie">
                <div className={classnames('columns', 'is-multiline')}>
                  {post.technologies.map((element, i) => {
                    return (
                      <div
                        className={classnames(
                          'column',
                          'is-4-mobile',
                          'is-3-tablet',
                          'is-3-desktop',
                          'is-3-widescreen',
                          'is-2-fullhd'
                        )}
                        key={`technology-${i}`}
                      >
                        <ImageLink link={element.link} title={element.name} image={element.logo} />
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}
            {post.link && (
              <Section subtitle="URL">
                <a href={post.link} title={post.title} target="_system">
                  {post.link}
                </a>
              </Section>
            )}
          </div>
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
