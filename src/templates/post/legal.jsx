import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import PostContent from "../../components/ui/article/post-content"
import PostHeader from "../../components/ui/article/post-header"
import Section from "../../components/ui/section"
import Attachments from "../../components/sections/attachments"
import Layout from "../../layouts/layout"

export default function Legal({ data: { post }, location }) {
  const { t } = useTranslation()

  return (
    <Layout
      title={post.title}
      description={post.description}
      location={location}
      breadcrumb={[
        {
          url: "/legal/",
          name: t("Legals"),
        },
      ]}
    >
      <article>
        <PostHeader title={post.title} subtitle={post.description} />
        <PostContent content={post.content} />
        {post.attachments.length > 0 && (
          <Section title={t("Attachments")}>
            <Attachments nodes={post.attachments} />
          </Section>
        )}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query LegalPostTemplate($slug: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: graphCmsLegal(stage: { eq: PUBLISHED }, slug: { eq: $slug }) {
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
