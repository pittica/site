import React from "react"
import { graphql } from "gatsby"

import Hero from "../components/ui/hero"
import Layout from "../components/layout/layout"
import PostContent from "../components/ui/article/post-content"

export default function Page({ data: { post }, location }) {
  return (
    <Layout
      title={post.title}
      post={post}
      description={post.subtitle}
      location={location}
    >
      <article>
        <Hero title={post.title} subtitle={post.subtitle} />
        <PostContent>{post.content}</PostContent>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!, $locale: GraphCMS_Locale!) {
    post: graphCmsPage(
      slug: { eq: $slug }
      stage: { eq: PUBLISHED }
      locale: { eq: $locale }
    ) {
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
    }
  }
`
