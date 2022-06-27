import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Blog from "../components/sections/blog"
import FeatureLink from "../components/ui/link/feature-link"
import PostContent from "../components/ui/article/post-content"
import PageSection from "../components/ui/article/page-section"
import Underground from "../components/ui/gfx/underground"
import Layout from "../layouts/layout"

export default function Index({
  data: {
    site: {
      siteMetadata: {
        title,
        description,
        appearance: { accent, theme },
      },
    },
    posts: { nodes },
    post,
  },
  location,
}) {
  const { t } = useTranslation()

  return (
    <Layout location={location}>
      <Underground accent={accent} theme={theme}>
        <h1>
          <span>{title}</span>
        </h1>
        <h2>
          <span>{description}</span>
        </h2>
        <FeatureLink to="/about" label={t("See More")} />
      </Underground>
      {post && post.content && <PostContent content={post.content} />}
      <Blog nodes={nodes} />
      {post &&
        post.sections.map((section, i) => (
          <PageSection key={`page-${i}-${section.id}`} section={section} />
        ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPage(
    $locale: GraphCMS_Locale!
    $stage: GraphCMS_Stage!
    $language: String!
  ) {
    site {
      siteMetadata {
        title
        description
        appearance {
          accent
          theme
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    posts: allGraphCmsPost(
      limit: 3
      filter: { locale: { eq: $locale }, stage: { eq: $stage } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        id
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
        slug
        excerpt
        date: formattedDate
        title
      }
    }
    post: graphCmsPage(
      locale: { eq: $locale }
      stage: { eq: $stage }
      slug: { eq: "index" }
    ) {
      content {
        html
      }
      sections {
        id
        title
        description: subtitle
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
          link {
            title
            url
            page {
              slug
            }
          }
          name
          logo {
            url
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
                extension
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
