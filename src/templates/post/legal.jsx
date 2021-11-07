import React from "react"
import { graphql } from "gatsby"

import ArticleHeader from "../../components/ui/article/article-header"
import PostContent from "../../components/ui/article/post-content"
import Hero from "../../components/ui/hero"
import Section from "../../components/ui/section"
import Attachments from "../../components/sections/attachments"
import Layout from "../../layouts/layout"

export default function Legal({ data: { post }, location }) {
  return (
    <Layout
      title={post.title}
      description={post.description}
      post={post}
      location={location}
    >
      <article>
        <ArticleHeader>
          <Hero title={post.title} subtitle={post.description}></Hero>
        </ArticleHeader>
        <PostContent content={post.content} />
        {post.attachments.length > 0 && (
          <Section title="Allegati">
            <Attachments nodes={post.attachments} />
          </Section>
        )}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query LegalPostTemplate($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsLegal(
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
      attachments {
        id
        title
        fileName
        localFile {
          publicURL
        }
        category
      }
    }
  }
`
