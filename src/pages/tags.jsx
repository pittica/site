import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Section from "../components/ui/section"
import TagLink from "../components/ui/link/tag-link"

export default function Tags({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const tags = {}

  data.tags.nodes.forEach(({ id, name, slug }) => {
    tags[id] = {
      name,
      slug,
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Section title="Tag">
        <ul className="page-list">
          {data.posts.group.map((node, index) => {
            return (
              <li key={"tag-" + index}>
                <TagLink tag={tags[node.fieldValue]} /> ({node.totalCount})
              </li>
            )
          })}
        </ul>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    posts: allGraphCmsPost(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: tags___name, order: ASC }
    ) {
      group(field: tags___id) {
        field
        fieldValue
        totalCount
      }
    }
    tags: allGraphCmsTag(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
    ) {
      nodes {
        id
        name
        slug
      }
    }
  }
`
