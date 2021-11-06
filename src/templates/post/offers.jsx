import React from "react"
import { graphql } from "gatsby"

import ContactForm from "../../components/contact-form"
import PostBlock from "../../components/ui/article/post-block"
import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Highlight from "../../components/ui/highlight"
import Section from "../../components/ui/section"
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
        <PostHeader image={cover} post={post}>
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
        <div className="container">
          {post.price && (
            <Section className="has-text-right">
              <strong>i prezzi sono da intendersi IVA 22% esclusa.</strong>
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
      </article>
    </Layout>
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
