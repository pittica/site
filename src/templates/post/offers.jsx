import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import ArticleHeader from "../../components/ui/article/article-header"
import ContactForm from "../../components/contact-form"
import Hero from "../../components/ui/hero"
import Highlight from "../../components/ui/highlight"
import PostContent from "../../components/ui/article/post-content"
import PostBlock from "../../components/ui/article/post-block"
import PostLayout from "../../components/layout/post-layout"
import Section from "../../components/ui/section"

export default function Offers({ data: { post }, location }) {
  const image = getImage(post.image.localFile.childImageSharp)
  const cover = image ? image.images.fallback.src : null

  let base

  switch (post.base) {
    case "montly":
      base = " al mese"
      break
    case "yearly":
      base = " all'anno"
      break
    case "daily":
      base = " al giorno"
      break
    case "weekly":
      base = " a settimana"
      break
    default:
      base = ""
      break
  }

  return (
    <PostLayout
      title={post.title}
      post={post}
      image={cover}
      location={location}
    >
      <ArticleHeader image={cover} className="post-header">
        <Hero
          title={post.title}
          subtitle={post.description}
          className="post-data"
        >
          {post.price && (
            <Highlight>
              {post.price}€{base}
            </Highlight>
          )}
        </Hero>
      </ArticleHeader>
      <PostContent>{post.content}</PostContent>
      <div className="container">
        {post.price && (
          <Section className="has-text-right">
            <strong>i prezzi sono da intendersi IVA 22% esclusa.</strong>
          </Section>
        )}
        {post.confcommercioDiscount && (
          <Section className="has-text-right" title="Convenzione Confcommercio">
            <p className="subtitle">
              Sconto <strong>{post.confcommercioDiscount}%</strong>
            </p>
            <p>
              Pittica offre uno sconto speciale a tutti i soci Confcommercio.
            </p>
            <p>
              Presenta la tua Tessera Associativa Confcommercio per ottenere
              sconti, servizi aggiuntivi e particolari condizioni di favore.
            </p>
            {post.confcommercioLink && (
              <a
                href={post.confcommercioLink}
                title="Convenzione Confcommercio"
              >
                {post.confcommercioLink}
              </a>
            )}
          </Section>
        )}
        <Section
          title="Contattaci"
          subtitle="Richiedi maggiori informazioni."
        />
        <ContactForm id="offer" />
        <PostBlock
          title="Servizi"
          subtitle="I servizi di riferimento dell'offerta"
          posts={post.services}
          group="services"
        />
      </div>
    </PostLayout>
  )
}

export const pageQuery = graphql`
  query OffersPostTemplate($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsOffer(
      slug: { eq: $slug }
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
    ) {
      slug
      locale
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
            gatsbyImageData(
              width: 1920
              height: 1080
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
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
              gatsbyImageData(
                width: 640
                height: 440
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
