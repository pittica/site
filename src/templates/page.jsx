import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import PostContent from "../components/ui/article/post-content"
import PageSection from "../components/ui/article/page-section"
import ContactForm from "../components/contact-form"
import Layout from "../layouts/layout"

export default function Page({ data: { post }, location }) {
  const { t } = useTranslation()

  return (
    <Layout
      title={post.title}
      description={post.subtitle}
      location={location}
      header={true}
    >
      <PostContent content={post.content} />
      {post.sections.map((section, i) => (
        <PageSection key={`page-${i}-${section.id}`} section={section} />
      ))}
      {post.contactForm && <ContactForm title={t("Contact Us")} />}
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageTemplate(
    $slug: String!
    $locale: GraphCMS_Locale!
    $stage: GraphCMS_Stage!
    $language: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: graphCmsPage(
      slug: { eq: $slug }
      stage: { eq: $stage }
      locale: { eq: $locale }
    ) {
      title
      description: subtitle
      content {
        html
      }
      contactForm
      sections {
        id
        title
        subtitle
        offers {
          id
          title
          slug
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
        services {
          id
          title
          slug
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
        technologies {
          logo {
            localFile {
              publicURL
            }
          }
          link
          name
        }
        people {
          id
          firstName
          lastName
          bio
          roles {
            name
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 240
                  height: 240
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          phone
          email
          gitHub
          imdb
          linkedIn
        }
        partners {
          id
          name
          link {
            title
            url
            page {
              slug
            }
          }
          logo {
            asset {
              localFile {
                publicURL
              }
            }
          }
        }
        partnerships {
          id
          name
          link {
            title
            url
            page {
              slug
            }
          }
          logo {
            url
            asset {
              localFile {
                publicURL
              }
              height
              width
              data
            }
          }
        }
        attachments {
          id
          title
          fileName
          localFile {
            publicURL
          }
          fileCategory
        }
        list
      }
    }
  }
`
