import React from "react"
import { graphql } from "gatsby"

import PostContent from "../../components/ui/article/post-content"
import PostLayout from "../../components/layout/post-layout"
import Section from "../../components/ui/section"
import Technologies from "../../components/ui/technologies"
import PostHeader from "../../components/ui/article/post-header"
import Screenshots from "../../components/sections/screenshots"

export default function Portfolio({ data: { post }, location }) {
  const cover =
    post.image && post.image.localFile ? post.image.localFile.publicURL : null

  return (
    <PostLayout
      title={post.title}
      post={post}
      image={cover}
      location={location}
    >
      <article className="blog-post">
        <PostHeader image={cover} post={post} />
        <PostContent>{post.content}</PostContent>
        {post.technologies && post.technologies.length > 0 && (
          <Section title="Tecnologie">
            <Technologies nodes={post.technologies} />
          </Section>
        )}
        <Screenshots screenshots={post.screenshots} title={post.title} />
        {post.link && (
          <Section title="URL">
            <a href={post.link} title={post.title} target="_system">
              {post.link}
            </a>
          </Section>
        )}
      </article>
    </PostLayout>
  )
}

export const pageQuery = graphql`
  query PortfolioPostTemplate($slug: String!) {
    post: graphCmsPortfolio(
      stage: { eq: PUBLISHED }
      locale: { eq: it }
      slug: { eq: $slug }
    ) {
      title
      slug
      link
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
