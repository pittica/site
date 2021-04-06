import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import Renderer from '../mdx/renderer';
import PostNav from '../components/nav/post-nav';
import PostLayout from '../components/layout/post-layout';
import TagLink from '../components/ui/link/tag-link';
import PostHeader from '../components/ui/article/post-header';

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.graphCmsPost;
    const { previous, next } = this.props.pageContext;
    const image = post.image ? getImage(post.image.localFile) : null;
    const cover = image ? image.images.fallback.src : null;

    return (
      <PostLayout title={post.title} image={cover} post={post} location={this.props.location}>
        <article className="blog-post">
          <PostHeader image={cover} post={post} />
          {post.tags.length > 0 && (
            <div className="container">{post.tags.map((tag, index) => <TagLink tag={tag} key={'tag' + index} />)}</div>
          )}
          <div className="container">
            <section className="post-content">
              <Renderer>{post.content}</Renderer>
            </section>
          </div>
        </article>
        <PostNav previous={previous} next={next} />
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    graphCmsPost(slug: { eq: $slug }, stage: { eq: PUBLISHED }, locale: { eq: it }) {
      id
      title
      date: formattedDate
      excerpt
      content {
        markdownNode {
          childMdx {
            body
          }
        }
      }
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
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
