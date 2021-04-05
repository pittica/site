import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import PostLayout from '../../components/layout/post-layout';
import ContactForm from '../../components/contact-form';
import Hero from '../../components/ui/hero';
import Section from '../../components/ui/section';
import ArticleHeader from '../../components/ui/article/article-header';

export default class ServicesPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const image = getImage(post.frontmatter.image);
    const cover = image ? image.images.fallback.src : null;

    return (
      <PostLayout title={post.frontmatter.title} post={post} image={cover} location={this.props.location}>
        <article className="blog-post">
          <ArticleHeader image={cover} className="post-header">
            <Hero title={post.frontmatter.title} subtitle={post.frontmatter.description} className="post-data" />
          </ArticleHeader>
          <div className="container">
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <Section title="Contattaci" subtitle="Richiedi maggiori informazioni." />
          <ContactForm />
        </article>
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query ServicesPostTemplate($slug: String!) {
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
        price
        confcommercioPercentage
        confcommercioLink
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
