import React, { Fragment } from "react"
import { graphql, Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Header from "../components/ui/header"
import Icon from "../components/ui/icon"

export default function Tags({
  location,
  data: {
    nodes: { nodes },
  },
}) {
  const { t } = useTranslation()

  return (
    <Fragment>
      <Seo title={t("Tags")} path={location.pathname} />
      <Header title={t("Tags")} />
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
    </Fragment>
  )
}

export const pageQuery = graphql`
  query TagsPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
