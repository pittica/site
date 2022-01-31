import React from "react"
import { graphql } from "gatsby"

import ContactForm from "../../components/contact-form"
import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
import Offers from "../../components/sections/offers"
import Layout from "../../layouts/layout"

import getCoverFallback from "../../utils/get-cover-fallback"

export default function Services({ data: { post }, location }) {
  const cover = getCoverFallback(post)

  return (
    <Layout
      title={post.title}
      description={post.description}
      post={post}
      image={cover}
      location={location}
    >
      <PostHeader
        image={cover}
        title={post.title}
        description={post.description}
      />
      <PostContent content={post.content} />
      {post.offers.length > 0 && (
        <Section
          title="Offerte"
          subtitle="Le offerte collegate a questo servizio"
        >
          <Offers nodes={post.offers} />
        </Section>
      )}
      <ContactForm
        id="service"
        title="Contattaci"
        subtitle="Richiedi maggiori informazioni"
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ServicesPostTemplate($slug: String!) {
    post: graphCmsService(stage: { eq: PUBLISHED }, slug: { eq: $slug }) {
      id
      title
      slug
      description
      content {
        html
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
      offers {
        slug
        title
        description
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                height: 440
                width: 640
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
