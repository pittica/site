import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Section from "../components/ui/section"
import CategoryLink from "../components/ui/link/category-link"

export default function Categories({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const categories = {}

  data.categories.nodes.forEach(({ id, name, slug }) => {
    categories[id] = {
      name,
      slug,
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Section title="Categorie">
        <ul className="page-list">
          {data.posts.group.map((node, index) => {
            return (
              <li key={"category-" + index}>
                <CategoryLink category={categories[node.fieldValue]} /> (
                {node.totalCount})
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
      sort: { fields: categories___name, order: ASC }
    ) {
      group(field: categories___id) {
        field
        fieldValue
        totalCount
      }
    }
    categories: allGraphCmsCategory(
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
