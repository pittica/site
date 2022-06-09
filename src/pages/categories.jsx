import React, { Fragment } from "react"
import { graphql, Link } from "gatsby"
import { groupify } from "@pittica/gatsby-plugin-utils"
import { Seo } from "@pittica/gatsby-plugin-seo"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Header from "../components/ui/header"
import Icon from "../components/ui/icon"

export default function Categories({
  location,
  data: {
    nodes: { nodes },
  },
}) {
  const { t } = useTranslation()

  return (
    <Fragment>
      <Seo title={t("Categories")} path={location.pathname} />
      <Header title={t("Categories")} />
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
    </Fragment>
  )
}

export const pageQuery = graphql`
  query CategoriesPage($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
