import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { Seo } from "@pittica/gatsby-plugin-seo"

import ContactForm from "../../components/contact-form"
import Footer from "../../components/ui/footer"
import Highlight from "../../components/ui/highlight"
import Main from "../../components/ui/main"
import PostContent from "../../components/ui/article/post-content"
import PostBlock from "../../components/ui/article/post-block"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
import TopMenu from "../../components/nav/top-menu"

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
    <div className="offer">
      <Seo
        title={post.title}
        description={post.description}
        isBlogPost={false}
        image={cover}
        postData={post}
        path={location.pathname}
      />
      <TopMenu location={location} />
      <Main>
        <article
          itemProp="offers"
          itemScope={true}
          itemType="https://schema.org/Offer"
        >
          <PostHeader image={cover} post={post}>
            {post.price && (
              <Highlight>
                <strong itemProp="price" content={post.price}>
                  {post.price}
                </strong>
                €{base}
                <meta itemProp="priceCurrency" content="EUR" />
                <link
                  itemProp="availability"
                  href="https://schema.org/InStock"
                />
              </Highlight>
            )}
            <meta itemProp="name" content={post.title} />
          </PostHeader>
          <PostContent>{post.content}</PostContent>
          <div className="container">
            {post.price && (
              <Section className="has-text-right">
                <strong>i prezzi sono da intendersi IVA 22% esclusa.</strong>
              </Section>
            )}
            {post.confcommercioDiscount && (
              <Section
                className="has-text-right"
                title="Convenzione Confcommercio"
              >
                <p className="subtitle">
                  Sconto <strong>{post.confcommercioDiscount}%</strong>
                </p>
                <p>
                  Pittica offre uno sconto speciale a tutti i soci
                  Confcommercio.
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
        </article>
      </Main>
      <Footer />
    </div>
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
