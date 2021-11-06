import React from "react"
import { graphql } from "gatsby"

import PostContent from "../components/ui/article/post-content"
import PageSection from "../components/ui/article/page-section"
import Layout from "../layouts/layout"

export default function Page({ data: { post }, location }) {
  return (
    <Layout
      title={post.title}
      post={post}
      description={post.subtitle}
      location={location}
      header={true}
    >
      <PostContent content={post.content} />
      {post.sections.map((section, i) => (
        <PageSection key={`page-${i}-${section.id}`} section={section} />
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageTemplate($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsPage(
      slug: { eq: $slug }
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
    ) {
      title
      subtitle
      content {
        markdownNode {
          childMdx {
            body
          }
        }
      }
      sections {
        id
        title
        subtitle
        content {
          markdownNode {
            childMdx {
              body
            }
          }
        }
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
          name
          bio
          email
          linkedIn
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
        }
        partners {
          id
          link
          name
          logo {
            localFile {
              publicURL
            }
          }
        }
        partnerships {
          id
          name
          page {
            slug
          }
          link
          logo {
            localFile {
              extension
              publicURL
            }
            height
            width
            data
          }
          logoUrl
        }
        list
      }
    }
  }
`
