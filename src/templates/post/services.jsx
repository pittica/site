import React from "react"
import { graphql } from "gatsby"

import ContactForm from "../../components/contact-form"
import PostBlock from "../../components/ui/article/post-block"
import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
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
      <PostHeader image={cover} post={post} />
      <PostContent content={post.content} />
      <PostBlock
        title="Offerte"
        subtitle="Le offerte collegate a questo servizio"
        posts={post.offers}
        group="offers"
      />
      <Section title="Contattaci" subtitle="Richiedi maggiori informazioni." />
      <ContactForm id="service" />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ServicesPostTemplate($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsService(
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
      slug: { eq: $slug }
    ) {
      id
      title
      slug
      description
      content {
        markdownNode {
          childMdx {
            body
          }
        }
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
                width: 1920
                height: 1080
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
