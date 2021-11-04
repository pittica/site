import React from "react"
import { graphql } from "gatsby"

import ArticleHeader from "../../components/ui/article/article-header"
import Hero from "../../components/ui/hero"
import PostContent from "../../components/ui/article/post-content"
import PostLayout from "../../components/layout/post-layout"

export default function Legal({ data: { post }, location }) {
  return (
    <PostLayout
      title={post.title}
      description={post.description}
      post={post}
      location={location}
    >
      <ArticleHeader>
        <Hero title={post.title} subtitle={post.description}></Hero>
      </ArticleHeader>
      <PostContent content={post.content} />
    </PostLayout>
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
    }
  }
`
