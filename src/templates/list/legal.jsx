import React from "react"
import classNames from "classnames"
import { graphql } from "gatsby"

import PageGrid from "../../components/ui/article/page-grid"
import Section from "../../components/ui/section"
import ListNav from "../../components/nav/list-nav"
import Layout from "../../layouts/layout"

export default function Legal({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <Layout
      location={location}
      context={pageContext}
      title="Note Legali"
      description="Documenti e Condizioni di Fornitura Servizi"
      header={true}
    >
      <Section>
        <div className={classNames("columns", "is-multiline")}>
          {nodes.map((node) => {
            return (
              <div className={classNames("column", "is-half")} key={node.slug}>
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
  ) {
    posts: allGraphCmsLegal(
      filter: { locale: { eq: $locale }, stage: { eq: PUBLISHED } }
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
