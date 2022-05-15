import React from "react"
import { graphql, Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"

import Layout from "../layouts/layout"
import Icon from "../components/ui/icon"

export default function Tags({
  location,
  data: {
    nodes: { nodes },
  },
}) {
  return (
    <Layout location={location} title="Tag" header={true}>
      <div className="container">
        {nodes.length > 0 && (
          <ul className="inline">
            {nodes.map(({ name, slug, posts }, i) => {
              if (posts && posts.length > 0) {
                return (
                  <li key={`tags-${i}`}>
                    <Icon
                      glyph={`icon-pittica-tag`}
                      className="has-text-primary"
                    >
                      <Link to={groupify(slug, "tags")} title={name}>
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
  query TagsPage {
    nodes: allGraphCmsTag(
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
