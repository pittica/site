import React from "react"
import { graphql } from "gatsby"
import { categorify } from "@pittica/gatsby-plugin-utils"

import Layout from "../components/layout/layout"
import Section from "../components/ui/section"
import TagLink from "../components/ui/link/tag-link"

export default function Tags({ data: { tags, posts, site }, location }) {
  const groups = categorify(tags.nodes)

  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Section title="Tag">
        <ul className="page-list">
          {posts.group.map((node, index) => {
            return (
              <li key={"tag-" + index}>
                <TagLink tag={groups[node.fieldValue]} /> ({node.totalCount})
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
