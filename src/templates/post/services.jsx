import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Section from "../../components/ui/section"
import ContactForm from "../../components/contact-form"
import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import RelatedBlock from "../../components/sections/related-block"
import Layout from "../../layouts/layout"

import { getCoverFallback } from "../../utils/image"

export default function Services({ data: { post }, location }) {
  const { t } = useTranslation()
  const cover = getCoverFallback(post)

  return (
    <Layout
      title={post.title}
      description={post.description}
      image={cover}
      location={location}
      breadcrumb={[
        {
          url: "/services/",
          name: t("Services"),
        },
      ]}
    >
      <article>
        <PostHeader
          image={cover}
          title={post.title}
          description={post.description}
        />
        <PostContent content={post.content} />
        {post.offers.length > 0 && (
          <Section
            title={t("Offers")}
            subtitle={t("Offers related to this service")}
          >
            <RelatedBlock nodes={post.offers} group="offers" />
          </Section>
        )}
        <ContactForm
          title={t("Contact Us")}
          subtitle={t("Request more information")}
        />
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ServicesPostTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: graphCmsService(stage: { eq: PUBLISHED }, slug: { eq: $slug }) {
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
      seoImage: image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 628)
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
