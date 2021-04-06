import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import classnames from 'classnames';

import PostContent from '../components/ui/article/post-content';
import PostLayout from '../components/layout/post-layout';
import Section from '../components/ui/section';
import ContactForm from '../components/contact-form';
import Hero from '../components/ui/hero';
import ArticleHeader from '../components/ui/article/article-header';
import StaticGrid from '../components/ui/article/static-grid';
import Highlight from '../components/ui/highlight';

export default class PostTemplate extends Component {
  render() {
    const post = this.props.data.graphCmsOffer;
    const image = getImage(post.image.localFile.childImageSharp);
    const cover = image ? image.images.fallback.src : null;

    let base;

    switch (post.base) {
      case 'montly':
        base = ' al mese';
        break;
      case 'yearly':
        base = " all'anno";
        break;
      case 'daily':
        base = ' al giorno';
        break;
      case 'weekly':
        base = ' a settimana';
        break;
      default:
        base = '';
        break;
    }

    return (
      <PostLayout title={post.title} post={post} image={cover} location={this.props.location}>
        <article className="blog-post">
          <ArticleHeader image={cover} className="post-header">
            <Hero title={post.title} subtitle={post.description} className="post-data">
              {post.price && (
                <Highlight>
                  {post.price}€{base}
                </Highlight>
              )}
            </Hero>
          </ArticleHeader>
          <PostContent>{post.content}</PostContent>
          <div className="container">
            <Section className="has-text-right">
              <strong>i prezzi sono da intendersi IVA 22% esclusa.</strong>
            </Section>
            {post.confcommercioDiscount && (
              <Section className="has-text-right" title="Convenzione Confcommercio">
                <p className="subtitle">
                  Sconto <strong>{post.confcommercioDiscount}%</strong>
                </p>
                <p>Pittica offre uno sconto speciale a tutti i soci Confcommercio.</p>
                <p>
                  Presenta la tua Tessera Associativa Confcommercio per ottenere sconti, servizi aggiuntivi e
                  particolari condizioni di favore.
                </p>
                {post.confcommercioLink && (
                  <a href={post.confcommercioLink} title="Convenzione Confcommercio">
                    {post.confcommercioLink}
                  </a>
                )}
              </Section>
            )}
            <Section title="Contattaci" subtitle="Richiedi maggiori informazioni." />
            <ContactForm />
            {post.services && (
              <Section title="Servizi" subtitle="I servizi di riferimento dell'offerta">
                <div className={classnames('columns', 'is-multiline')}>
                  {post.services.map((element) => {
                    return (
                      <div
                        className={classnames('column', 'is-12-mobile', 'is-6-tablet', 'is-3-desktop')}
                        key={element.slug}
                      >
                        <StaticGrid node={element} group="services" />
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}
          </div>
        </article>
      </PostLayout>
    );
  }
}

export const pageQuery = graphql`
  query OffersPostTemplate($slug: String!) {
    graphCmsOffer(slug: { eq: $slug }, stage: { eq: PUBLISHED }, locale: { eq: it }) {
      slug
      title
      description
      base
      content {
        markdownNode {
          childMdx {
            body
          }
        }
      }
      price
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1920, height: 1080, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
      confcommercioLink
      confcommercioDiscount
      services {
        slug
        title
      }
      services {
        slug
        title
        description
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 640, height: 440, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      }
    }
  }
`;
