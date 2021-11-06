import React from "react"
import { graphql } from "gatsby"

import List from "../layouts/list"

export default function Categories({
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
      group="categories"
      title="Categorie"
      icon="folder"
    />
  )
}

export const pageQuery = graphql`
  query CategoriesPage {
    posts: allGraphCmsPost(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
      sort: { fields: categories___name, order: ASC }
    ) {
      group(field: categories___id) {
        field
        fieldValue
        totalCount
      }
    }
    entries: allGraphCmsCategory(
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
