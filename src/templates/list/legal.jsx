import React from "react"
import { graphql } from "gatsby"
import classnames from "classnames"

import ListLayout from "../../components/layout/list-layout"
import PageGrid from "../../components/ui/article/page-grid"

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
      <div className={classnames("columns", "is-multiline")}>
        {nodes.map((node) => {
          return (
            <div className={classnames("column", "is-half")} key={node.slug}>
              <PageGrid node={node} group={pageContext.group} />
            </div>
          )
        })}
      </div>
    </ListLayout>
  )
}

export const pageQuery = graphql`
  query LegalListTemplate($skip: Int!, $limit: Int!) {
    posts: allGraphCmsLegal(
      filter: { locale: { eq: it }, stage: { eq: PUBLISHED } }
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
