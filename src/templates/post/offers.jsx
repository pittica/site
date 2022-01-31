import React from "react"
import { graphql } from "gatsby"

import ContactForm from "../../components/contact-form"
import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
import Services from "../../components/sections/services"
import Highlight from "../../components/ui/highlight"
import Layout from "../../layouts/layout"

import getCoverFallback from "../../utils/get-cover-fallback"
import getPaymentInterval from "../../utils/get-payment-interval"

export default function Offers({ data: { post }, location }) {
  const cover = getCoverFallback(post)

  return (
    <Layout
      title={post.title}
      description={post.description}
      blog={false}
      image={cover}
      post={post}
      location={location}
    >
      <article
        itemProp="offers"
        itemScope={true}
        itemType="https://schema.org/Offer"
      >
        <PostHeader
          image={cover}
          title={post.title}
          description={post.description}
        >
          {post.price && (
            <Highlight>
              <strong itemProp="price" content={post.price}>
                {post.price} €
              </strong>
              {getPaymentInterval(post)}
              <meta itemProp="priceCurrency" content="EUR" />
              <link itemProp="availability" href="https://schema.org/InStock" />
            </Highlight>
          )}
          <meta itemProp="name" content={post.title} />
        </PostHeader>
        <PostContent content={post.content} />
        {post.price && (
          <Section className="has-text-right">
            <strong>i prezzi sono da intendersi IVA 22% esclusa.</strong>
          </Section>
        )}
        <ContactForm
          id="offer"
          title="Contattaci"
          subtitle="Richiedi maggiori informazioni"
        />
        {post.services.length > 0 && (
          <Section
            title="Servizi"
            subtitle="I servizi di riferimento dell'offerta"
          >
            <Services nodes={post.services} />
          </Section>
        )}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query OffersPostTemplate($slug: String!) {
    post: graphCmsOffer(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      slug
      locale
      title
      description
      base
      content {
        html
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
      services {
        id
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
