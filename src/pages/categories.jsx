import React from "react"
import { graphql } from "gatsby"
import { categorify } from "@pittica/gatsby-plugin-utils"

import CategoryLink from "../components/ui/link/category-link"
import Layout from "../components/layout/layout"
import Section from "../components/ui/section"

export default function Categories({
  data: { categories, posts, site },
  location,
}) {
  const groups = categorify(categories.nodes)

  return (
    <Layout location={location} title={site.siteMetadata.title}>
      <Section title="Categorie">
        <ul className="page-list">
          {posts.group.map((node, index) => {
            return (
              <li key={"category-" + index}>
                <CategoryLink category={groups[node.fieldValue]} /> (
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
