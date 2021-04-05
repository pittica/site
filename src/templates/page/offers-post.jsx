import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

import PostLayout from '../../components/layout/post-layout';
import Section from '../../components/ui/section';
import ContactForm from '../../components/contact-form';
import Hero from '../../components/ui/hero';
import ArticleHeader from '../../components/ui/article/article-header';
import Highlight from '../../components/ui/highlight';

export default class PostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark;
    const image = getImage(post.frontmatter.image);
    const cover = image ? image.images.fallback.src : null;

    return (
      <PostLayout title={post.frontmatter.title} post={post} image={cover} location={this.props.location}>
        <article className="blog-post">
          <ArticleHeader image={cover} className="post-header">
            <Hero title={post.frontmatter.title} subtitle={post.frontmatter.description} className="post-data">
              <Highlight>{post.frontmatter.price}</Highlight>
            </Hero>
          </ArticleHeader>
          <div className="container">
            <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            <Section className="has-text-right">
              <strong>i prezzi sono da intendersi IVA 22% esclusa.</strong>
            </Section>
            {post.frontmatter.confcommercioPercentage && (
              <Section className="has-text-right" title="Convenzione Confcommercio">
                <p className="subtitle">
                  Sconto <strong>{post.frontmatter.confcommercioPercentage}%</strong>
                </p>
                <p>Pittica offre uno sconto speciale a tutti i soci Confcommercio.</p>
                <p>Presenta la tua Tessera Associativa Confcommercio per ottenere sconti, servizi aggiuntivi e particolari condizioni di favore.</p>
                {post.frontmatter.confcommercioLink && (
                  <a href={post.frontmatter.confcommercioLink} title="Convenzione Confcommercio">
                    {post.frontmatter.confcommercioLink}
                  </a>
                )}
              </Section>
            )}
            <Section title="Contattaci" subtitle="Richiedi maggiori informazioni." />
            <ContactForm />
          </div>
        </article>
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query OffersPostTemplate($slug: String!) {
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
