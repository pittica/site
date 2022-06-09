import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
import Screenshots from "../../components/sections/screenshots"
import Videos from "../../components/sections/videos"
import Technologies from "../../components/sections/technologies"
import Layout from "../../layouts/layout"

export default function Portfolio({ data: { post }, location }) {
  const { t } = useTranslation()
  const cover =
    post.image && post.image.localFile ? post.image.localFile.publicURL : null

  return (
    <Layout
      title={post.title}
      description={post.description}
      image={cover}
      location={location}
      breadcrumb={[
        {
          url: "/portfolio/",
          name: t("Portfolio"),
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
        {post.technologies && post.technologies.length > 0 && (
          <Section title={t("Technologies")}>
            <Technologies nodes={post.technologies} />
          </Section>
        )}
        {post.videos && post.videos.length > 0 && (
          <Section title={t("Videos")}>
            <Videos nodes={post.videos} title={post.title} />
          </Section>
        )}
        {post.screenshots && post.screenshots.length > 0 && (
          <Section title={t("Screenshots")}>
            <Screenshots nodes={post.screenshots} title={post.title} />
          </Section>
        )}
        {post.links && post.links.length > 0 && (
          <Section title={t("URLs")}>
            <ul>
              {post.links.map((link, i) => (
                <li key={`link-${i}`}>
                  <a href={link} title={post.title} target="_system">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PortfolioPostTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: graphCmsPortfolio(stage: { eq: PUBLISHED }, slug: { eq: $slug }) {
      title
      slug
      description
      links
      content {
        html
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
      image {
        localFile {
          publicURL
        }
      }
      seoImage: image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 628)
          }
        }
      }
      screenshots {
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
      videos
    }
  }
`
