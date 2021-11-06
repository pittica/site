import React from "react"
import { graphql } from "gatsby"
import classNames from "classnames"

import PageGrid from "../../components/ui/article/page-grid"
import ListLayout from "../../components/layout/list-layout"

export default function Legal({
  data: {
    posts: { nodes },
  },
  pageContext,
  location,
}) {
  return (
    <ListLayout
      location={location}
      context={pageContext}
      title="Note Legali"
      description="Documenti e Condizioni di Fornitura Servizi"
    >
      <div className={classNames("columns", "is-multiline")}>
        {nodes.map((node) => {
          return (
            <div className={classNames("column", "is-half")} key={node.slug}>
              <PageGrid node={node} group={pageContext.group} />
            </div>
          )
        })}
      </div>
    </ListLayout>
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
