import React from "react"
import { graphql } from "gatsby"

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
    page,
  },
  location,
}) {
  return (
    <Layout location={location} description={description}>
      <Underground accent={accent} theme={theme}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <FeatureLink to="/about" label="Scopri" />
      </Underground>
      {page && page.content && <PostContent content={page.content} />}
      <Blog nodes={nodes} />
      {page &&
        page.sections.map((section, i) => (
          <PageSection key={`page-${i}-${section.id}`} section={section} />
        ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPage($locale: GraphCMS_Locale!, $stage: GraphCMS_Stage!) {
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
    page: graphCmsPage(
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
