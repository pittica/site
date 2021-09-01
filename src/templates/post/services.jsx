import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import ArticleHeader from "../../components/ui/article/article-header"
import ContactForm from "../../components/contact-form"
import Hero from "../../components/ui/hero"
import PostContent from "../../components/ui/article/post-content"
import PostBlock from "../../components/ui/article/post-block"
import PostLayout from "../../components/layout/post-layout"
import Section from "../../components/ui/section"

export default function Services({ data: { post }, location }) {
  const image = getImage(post.image.localFile.childImageSharp)
  const cover = image ? image.images.fallback.src : null

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
        />
      </ArticleHeader>
      <PostContent>{post.content}</PostContent>
      <PostBlock
        title="Offerte"
        subtitle="Le offerte collegate a questo servizio"
        posts={post.offers}
        group="offers"
      />
      <Section title="Contattaci" subtitle="Richiedi maggiori informazioni." />
      <ContactForm id="service" />
    </PostLayout>
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
