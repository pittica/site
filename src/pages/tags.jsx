import React from "react"
import { graphql } from "gatsby"

import List from "../layouts/list"

export default function Tags({
  data: {
    posts: { group },
    entries: { nodes },
  },
  location,
}) {
  return (
    <List
      location={location}
      nodes={nodes}
      groups={group}
      group="tags"
      title="Tags"
      icon="tag"
    />
  )
}

export const pageQuery = graphql`
  query TagsPage {
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
    entries: allGraphCmsTag(
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
