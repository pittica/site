import React from "react"
import { graphql } from "gatsby"

import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
import Screenshots from "../../components/sections/screenshots"
import Technologies from "../../components/sections/technologies"
import Layout from "../../layouts/layout"

export default function Portfolio({ data: { post }, location }) {
  const cover =
    post.image && post.image.localFile ? post.image.localFile.publicURL : null

  return (
    <Layout title={post.title} post={post} image={cover} location={location}>
      <PostHeader image={cover} post={post} />
      <PostContent content={post.content} />
      {post.technologies && post.technologies.length > 0 && (
        <Section title="Tecnologie">
          <Technologies nodes={post.technologies} />
        </Section>
      )}
      <Screenshots screenshots={post.screenshots} title={post.title} />
      {post.links && post.links.length > 0 && (
        <Section title="URL">
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query PortfolioPostTemplate($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsPortfolio(
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
      slug: { eq: $slug }
    ) {
      title
      slug
      links
      content {
        markdownNode {
          childMdx {
            body
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
      description
      image {
        localFile {
          publicURL
        }
      }
      screenshots {
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
`
