import React from "react"
import { graphql } from "gatsby"
import classNames from "classnames"
import { groupify } from "@pittica/gatsby-plugin-utils"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Section from "../../components/ui/section"
import Card from "../../components/ui/card"
import ListNav from "../../components/nav/list-nav"
import Layout from "../../layouts/layout"

export default function Portfolio({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  const { t } = useTranslation()

  return (
    <Layout
      location={location}
      context={pageContext}
      title={t("Portfolio")}
      description={t("Our works")}
      header={true}
    >
      <Section>
        <div className={classNames("columns", "is-multiline", "is-mobile")}>
          {nodes.map(({ id, title, slug, image }, i) => {
            const link = groupify(slug, pageContext.group)

            return (
              <div
                className={classNames(
                  "column",
                  "is-half-mobile",
                  "is-one-third-tablet",
                  "is-one-quarter-desktop"
                )}
                key={`portfolio-${i}-${id}`}
              >
                <article>
                  <Card image={image} title={title} link={link} />
                </article>
              </div>
            )
          })}
        </div>
      </Section>
      <ListNav context={pageContext} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PortfolioListTemplate(
    $skip: Int!
    $limit: Int!
    $locale: GraphCMS_Locale!
    $language: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    posts: allGraphCmsPortfolio(
      filter: { stage: { eq: PUBLISHED }, locale: { eq: $locale } }
      limit: $limit
      skip: $skip
      sort: { fields: [sticky, updatedAt], order: [DESC, DESC] }
    ) {
      nodes {
        slug
        locale
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 640
                height: 440
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
            extension
            publicURL
          }
        }
      }
      totalCount
    }
  }
`
