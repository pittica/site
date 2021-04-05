import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import PostNav from '../components/nav/post-nav';
import PostLayout from '../components/layout/post-layout';
import TagLink from '../components/ui/link/tag-link';
import PostHeader from '../components/ui/article/post-header';

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pageContext;
    const image = getImage(post.frontmatter.image);
    const cover = image ? image.images.fallback.src : null;

    let tags;

    if (post.frontmatter.tags instanceof Array) {
      tags = post.frontmatter.tags;
    } else {
      tags = [ post.frontmatter.tags ];
    }

    return (
      <PostLayout title={post.frontmatter.title} image={cover} post={post} location={this.props.location}>
        <article className="blog-post">
          <PostHeader image={cover} post={post} />
          {tags.length > 0 && (
            <div className="container">{tags.map((tag, index) => <TagLink tag={tag} key={'tag' + index} />)}</div>
          )}
          <div className="container">
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </article>
        <PostNav previous={previous} next={next} />
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        categories
        tags
        image {
          childImageSharp {
            gatsbyImageData(width: 1920, height: 1280, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
