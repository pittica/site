import React from "react"
import { graphql } from "gatsby"

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
      location={location}
      breadcrumb={[
        {
          url: "/legal/",
          name: "Note Legali",
        },
      ]}
    >
      <article>
        <header>
          <Hero title={post.title} subtitle={post.description}></Hero>
        </header>
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
  query LegalPostTemplate($slug: String!) {
    post: graphCmsLegal(stage: { eq: PUBLISHED }, slug: { eq: $slug }) {
      id
      title
      slug
      description
      content {
        html
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
    }
  }
`
