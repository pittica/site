import React from "react"
import classNames from "classnames"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Section from "../../components/ui/section"
import PageGrid from "../../components/ui/article/page-grid"
import ListNav from "../../components/nav/list-nav"
import Layout from "../../layouts/layout"

export default function Legal({
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
      title={t("Legals")}
      description={t("Documents and Terms of Service")}
      header={true}
    >
      <Section>
        <div className={classNames("columns", "is-multiline")}>
          {nodes.map((node) => {
            return (
              <div
                className={classNames("column", "is-half")}
                key={`legal-${node.slug}`}
              >
                <PageGrid node={node} group={pageContext.group} />
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
  query LegalListTemplate(
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
    posts: allGraphCmsLegal(
      filter: { stage: { eq: PUBLISHED }, locale: { eq: $locale } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        title
        slug
        description
      }
    }
  }
`
