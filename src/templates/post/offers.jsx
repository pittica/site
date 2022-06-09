import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Highlight from "../../components/ui/highlight"
import Section from "../../components/ui/section"
import ContactForm from "../../components/contact-form"
import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import RelatedBlock from "../../components/sections/related-block"
import Layout from "../../layouts/layout"

import { getCoverFallback } from "../../utils/image"

export default function Offers({ data: { post }, location }) {
  const { t } = useTranslation()
  const intervals = useTranslation("intervals")
  const cover = getCoverFallback(post)

  return (
    <Layout
      title={post.title}
      description={post.description}
      image={cover}
      location={location}
      breadcrumb={[
        {
          url: "/offers/",
          name: t("Offers"),
        },
      ]}
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
          {post.price && post.price.value && (
            <Highlight>
              <strong itemProp="price" content={post.price}>
                {post.price.value} €
              </strong>{" "}
              {intervals.t(post.price.unit)}
              <meta itemProp="priceCurrency" content="EUR" />
              <link itemProp="availability" href="https://schema.org/InStock" />
            </Highlight>
          )}
          <meta itemProp="name" content={post.title} />
        </PostHeader>
        <PostContent content={post.content} />
        {post.price && post.price.vat && (
          <Section className="has-text-right">
            <strong>
              {t("prices are {{vat}}% VAT excluded.", { vat: post.price.vat })}
            </strong>
          </Section>
        )}
        <ContactForm
          title={t("Contact Us")}
          subtitle={t("Request more information")}
        />
        {post.services.length > 0 && (
          <Section
            title={t("Services")}
            subtitle={t("The reference services of the offer")}
          >
            <RelatedBlock nodes={post.services} group="services" />
          </Section>
        )}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query OffersPostTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: graphCmsOffer(slug: { eq: $slug }, stage: { eq: PUBLISHED }) {
      title
      slug
      description
      content {
        html
      }
      price {
        value
        unit
        vat
      }
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
      seoImage: image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 628)
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
