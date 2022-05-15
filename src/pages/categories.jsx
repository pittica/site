import React from "react"
import { graphql, Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import Layout from "../layouts/layout"
import Icon from "../components/ui/icon"

export default function Categories({
  location,
  data: {
    nodes: { nodes },
  },
}) {
  return (
    <Layout location={location} title="Categorie" header={true}>
      <div className="container">
        {nodes.length > 0 && (
          <ul className="inline">
            {nodes.map(({ name, slug, posts }, i) => {
              if (posts && posts.length > 0) {
                return (
                  <li key={`categories-${i}`}>
                    <Icon
                      glyph={`icon-pittica-folder`}
                      className="has-text-primary"
                    >
                      <Link to={groupify(slug, "categories")} title={name}>
                        {name} ({posts.length})
                      </Link>
                    </Icon>
                  </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoriesPage {
    nodes: allGraphCmsCategory(
      filter: {
        stage: { eq: PUBLISHED }
        posts: { elemMatch: { stage: { eq: PUBLISHED } } }
      }
    ) {
      nodes {
        name
        slug
        posts {
          id
        }
      }
    }
  }
`
