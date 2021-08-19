import React from "react"
import { graphql } from "gatsby"

import ArticleHeader from "../../components/ui/article/article-header"
import PostContent from "../../components/ui/article/post-content"
import PostLayout from "../../components/layout/post-layout"

export default function Legal({ data: { post }, location }) {
  return (
    <PostLayout title={post.title} post={post} location={location}>
      <ArticleHeader>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{post.title}</h1>
              <h2 className="subtitle">{post.description}</h2>
            </div>
          </div>
        </section>
      </ArticleHeader>
      <PostContent>{post.content}</PostContent>
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
